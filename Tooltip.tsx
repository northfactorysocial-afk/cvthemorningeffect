import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  showIcon?: boolean;
  delay?: number;
}

export default function Tooltip({
  content,
  children,
  position = 'top',
  className = '',
  showIcon = false,
  delay = 300,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
          x: rect.left + rect.width / 2,
          y: rect.top,
        });
      }
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const positionClasses = {
    top: '-translate-x-1/2 bottom-full left-1/2 mb-2',
    bottom: '-translate-x-1/2 top-full left-1/2 mt-2',
    left: '-translate-y-1/2 right-full top-1/2 mr-2',
    right: '-translate-y-1/2 left-full top-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children || (
        showIcon && (
          <HelpCircle
            size={16}
            className="text-gray-400 hover:text-gray-600 cursor-help transition-colors"
          />
        )
      )}

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 ${positionClasses[position]} fade-in`}
          role="tooltip"
        >
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl max-w-xs whitespace-normal">
            {content}
            <div
              className={`absolute w-0 h-0 border-4 border-gray-900 ${arrowClasses[position]}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function TooltipButton({
  content,
  position = 'top',
  className = '',
}: {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}) {
  return (
    <Tooltip content={content} position={position} className={className}>
      <button
        type="button"
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        aria-label="More information"
      >
        <HelpCircle size={12} className="text-gray-600" />
      </button>
    </Tooltip>
  );
}

export function FeatureHighlight({
  title,
  description,
  targetId,
  onNext,
  onSkip,
  position = 'bottom',
  stepNumber,
  totalSteps,
}: {
  title: string;
  description: string;
  targetId: string;
  onNext?: () => void;
  onSkip?: () => void;
  position?: 'top' | 'bottom' | 'left' | 'right';
  stepNumber?: number;
  totalSteps?: number;
}) {
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const element = document.getElementById(targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });
        setIsVisible(true);

        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetId]);

  if (!isVisible) return null;

  const getHighlightStyle = () => {
    return {
      top: `${coords.top}px`,
      left: `${coords.left}px`,
      width: `${coords.width}px`,
      height: `${coords.height}px`,
    };
  };

  const getTooltipPosition = () => {
    const offset = 16;
    switch (position) {
      case 'top':
        return {
          top: `${coords.top - offset}px`,
          left: `${coords.left + coords.width / 2}px`,
          transform: 'translate(-50%, -100%)',
        };
      case 'bottom':
        return {
          top: `${coords.top + coords.height + offset}px`,
          left: `${coords.left + coords.width / 2}px`,
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          top: `${coords.top + coords.height / 2}px`,
          left: `${coords.left - offset}px`,
          transform: 'translate(-100%, -50%)',
        };
      case 'right':
        return {
          top: `${coords.top + coords.height / 2}px`,
          left: `${coords.left + coords.width + offset}px`,
          transform: 'translateY(-50%)',
        };
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm fade-in" onClick={onSkip} />

      <div
        className="fixed z-[95] pointer-events-none"
        style={getHighlightStyle()}
      >
        <div className="absolute inset-0 rounded-xl ring-4 ring-sunrise-400 ring-offset-4 ring-offset-transparent animate-pulse" />
      </div>

      <div
        className="fixed z-[95] w-80 scale-in"
        style={getTooltipPosition()}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-sunrise-400">
          {stepNumber && totalSteps && (
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i < stepNumber ? 'bg-sunrise-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          )}

          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>

          <div className="flex items-center justify-between gap-3">
            {onSkip && (
              <button
                onClick={onSkip}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Skip tour
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                className="ml-auto px-4 py-2 bg-sunrise-600 text-white rounded-lg font-medium hover:bg-sunrise-700 transition-colors"
              >
                {stepNumber === totalSteps ? 'Finish' : 'Next'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
