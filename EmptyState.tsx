import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  statistic?: {
    value: string;
    label: string;
  };
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  illustration?: React.ReactNode;
  variant?: 'default' | 'powerful' | 'celebration';
}

const EmptyState = React.memo(function EmptyState({
  icon: Icon,
  title,
  description,
  statistic,
  primaryAction,
  secondaryAction,
  illustration,
  variant = 'default'
}: EmptyStateProps) {

  if (variant === 'powerful') {
    return (
      <div className="flex items-center justify-center min-h-[500px] p-6">
        <div className="max-w-2xl w-full text-center">
          {illustration ? (
            <div className="mb-8 animate-float">
              {illustration}
            </div>
          ) : Icon ? (
            <div className="flex justify-center mb-8 animate-float">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-sunrise/20 to-amber/20 rounded-full blur-xl animate-pulse-soft"></div>
                <div className="relative p-6 bg-gradient-to-br from-sunrise to-amber rounded-full shadow-warm-lg">
                  <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          ) : null}

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h2>

          {description && (
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed max-w-xl mx-auto">
              {description}
            </p>
          )}

          {statistic && (
            <div className="inline-block mb-8 px-6 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-sunrise text-2xl">{statistic.value}</span>
                {' '}
                <span className="text-gray-600">{statistic.label}</span>
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="group px-8 py-4 bg-gradient-to-r from-sunrise to-amber text-white rounded-2xl font-semibold text-lg hover:shadow-warm-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[240px] justify-center"
              >
                {primaryAction.label}
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            )}

            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="px-6 py-3 text-gray-700 hover:text-sunrise font-medium transition-colors duration-200 flex items-center gap-2"
              >
                {secondaryAction.label}
                <span className="text-sunrise">→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'celebration') {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-6">
        <div className="max-w-2xl w-full text-center">
          {Icon && (
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative p-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg">
                  <Icon className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          )}

          <h3 className="text-3xl font-bold text-gray-900 mb-3">
            {title}
          </h3>

          {description && (
            <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
              {description}
            </p>
          )}

          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="px-8 py-3 bg-gradient-to-r from-sunrise to-amber text-white rounded-xl font-semibold hover:shadow-warm-lg transform hover:scale-105 transition-all duration-300"
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[300px] p-4">
      <div className="max-w-md w-full text-center">
        {Icon && (
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-sunrise/10 rounded-full">
              <Icon className="w-8 h-8 text-sunrise" />
            </div>
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 mb-6">
            {description}
          </p>
        )}
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="px-6 py-2.5 bg-sunrise text-white rounded-lg font-medium hover:bg-amber transition-colors"
          >
            {primaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
});

export default EmptyState;
