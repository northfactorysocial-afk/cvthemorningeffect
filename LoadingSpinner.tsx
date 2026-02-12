import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = React.memo(function LoadingSpinner({
  size = 'md',
  message,
  fullScreen = false
}: LoadingSpinnerProps) {
  const { t } = useLanguage();
  const displayMessage = message || t.common.loading;
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-orange-500 border-t-transparent`} />
      {displayMessage && (
        <p className="text-sm text-gray-600 animate-pulse">{displayMessage}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      {spinner}
    </div>
  );
});

export default LoadingSpinner;
