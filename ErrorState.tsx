import React from 'react';
import { AlertCircle, RefreshCw, AlertTriangle, WifiOff, XCircle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  details?: string;
  onRetry?: () => void;
  retryLabel?: string;
  type?: 'error' | 'warning' | 'network' | 'not-found';
  title?: string;
}

const ErrorState = React.memo(function ErrorState({
  message = 'Algo salió mal',
  details,
  onRetry,
  retryLabel = 'Reintentar',
  type = 'error',
  title
}: ErrorStateProps) {
  const config = {
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200',
      buttonColor: 'bg-amber-600 hover:bg-amber-700',
    },
    network: {
      icon: WifiOff,
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
    'not-found': {
      icon: AlertCircle,
      bgColor: 'bg-gray-50',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
      borderColor: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
    },
  };

  const { icon: Icon, bgColor, iconBg, iconColor, borderColor, buttonColor } = config[type];

  return (
    <div className="flex items-center justify-center min-h-[300px] p-4 slide-up">
      <div className={`max-w-md w-full ${bgColor} rounded-2xl border ${borderColor} shadow-lg p-8`}>
        <div className="flex flex-col items-center text-center">
          <div className={`${iconBg} rounded-full p-4 mb-4 pulse-soft`}>
            <Icon className={`${iconColor} w-8 h-8`} />
          </div>
          {title && (
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {title}
            </h3>
          )}
          <h3 className="font-semibold text-gray-900 mb-2">
            {message}
          </h3>
          {details && (
            <p className="text-sm text-gray-600 mb-6">
              {details}
            </p>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className={`flex items-center gap-2 px-6 py-3 ${buttonColor} text-white rounded-xl font-semibold transition-all duration-300 hover-lift shadow-lg`}
            >
              <RefreshCw className="w-5 h-5" />
              {retryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export function InlineError({ message, className = '' }: { message: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg slide-down ${className}`}>
      <AlertCircle className="text-red-600 flex-shrink-0" size={18} />
      <p className="text-sm text-red-700">{message}</p>
    </div>
  );
}

export function SuccessMessage({ message, className = '' }: { message: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg slide-down success-pulse ${className}`}>
      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-sm text-green-700 font-medium">{message}</p>
    </div>
  );
}

export default ErrorState;
