import { AlertCircle, FileText, ExternalLink } from 'lucide-react';

interface EnvErrorFallbackProps {
  errors: string[];
  warnings: string[];
}

export default function EnvErrorFallback({ errors, warnings }: EnvErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-red-200 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Error de Configuración
            </h1>
            <p className="text-gray-600">
              Las variables de entorno no están configuradas correctamente
            </p>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-red-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Errores Críticos
            </h2>
            <ul className="space-y-2">
              {errors.map((error, index) => (
                <li key={index} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-red-600 font-bold mt-0.5">•</span>
                  <span className="text-sm text-red-800">{error}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {warnings.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-orange-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Advertencias
            </h2>
            <ul className="space-y-2">
              {warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <span className="text-orange-600 font-bold mt-0.5">•</span>
                  <span className="text-sm text-orange-800">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Cómo solucionar
          </h3>
          <ol className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>Crea un archivo <code className="px-1.5 py-0.5 bg-blue-100 rounded">.env</code> en la raíz del proyecto</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <span>Copia el contenido de <code className="px-1.5 py-0.5 bg-blue-100 rounded">.env.example</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <span>Reemplaza los valores de ejemplo con tus credenciales de Supabase</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">4.</span>
              <span>Reinicia el servidor de desarrollo</span>
            </li>
          </ol>
        </div>

        <div className="flex gap-3">
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            Ir a Supabase Dashboard
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Desarrollo: {import.meta.env.DEV ? 'Sí' : 'No'} |
            Producción: {import.meta.env.PROD ? 'Sí' : 'No'}
          </p>
        </div>
      </div>
    </div>
  );
}
