import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: React.ErrorInfo, reset: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    console.error('ErrorBoundary caught an error:', error, errorInfo);

    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack
          }
        }
      });
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  reloadPage = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback && this.state.error && this.state.errorInfo) {
        return this.props.fallback(this.state.error, this.state.errorInfo, this.resetError);
      }

      const { error, errorInfo, errorCount } = this.state;
      const isCriticalError = errorCount >= 3;

      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-orange-100 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isCriticalError ? 'Error Crítico' : 'Algo salió mal'}
                </h1>
                <p className="text-gray-600">
                  {isCriticalError
                    ? 'La aplicación encontró múltiples errores. Por favor, recarga la página.'
                    : 'No te preocupes, estamos trabajando para solucionarlo.'
                  }
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-semibold text-red-900 mb-2">
                  Error: {error.message}
                </p>
                {process.env.NODE_ENV === 'development' && errorInfo && (
                  <details className="mt-3">
                    <summary className="text-sm text-red-700 cursor-pointer hover:text-red-900">
                      Ver detalles técnicos
                    </summary>
                    <pre className="mt-2 text-xs text-red-800 overflow-auto max-h-48 p-2 bg-white rounded border border-red-200">
                      {error.stack}
                      {'\n\n'}
                      {errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {!isCriticalError && (
                <button
                  onClick={this.resetError}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  Intentar de nuevo
                </button>
              )}
              <button
                onClick={this.reloadPage}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                <Home className="w-5 h-5" />
                Volver al inicio
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Si el problema persiste, por favor contacta a soporte o intenta más tarde.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
