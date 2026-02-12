import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'wave',
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-xl',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: '',
  };

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || '100%',
  };

  return (
    <div
      className={`bg-gray-200 ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" height={20} width="60%" />
          <Skeleton variant="text" height={16} width="40%" />
        </div>
      </div>
      <Skeleton variant="rounded" height={80} className="mb-3" />
      <div className="space-y-2">
        <Skeleton variant="text" height={14} />
        <Skeleton variant="text" height={14} width="80%" />
      </div>
    </div>
  );
}

export function SkeletonHabitItem() {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={24} height={24} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" height={18} width="70%" />
          <Skeleton variant="text" height={14} width="50%" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGoalItem() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-pink-50 rounded-xl p-4 border border-amber-100">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" height={18} width="60%" />
            <Skeleton variant="text" height={14} width="80%" />
          </div>
        </div>
        <div className="space-y-1">
          <Skeleton variant="text" height={12} width="30%" />
          <Skeleton variant="rounded" height={8} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="bg-gradient-to-br from-dawn-50 to-cyan-50 rounded-xl p-4 border border-dawn-100 text-center">
      <Skeleton variant="text" height={36} width={60} className="mx-auto mb-2" />
      <Skeleton variant="text" height={14} width={80} className="mx-auto" />
    </div>
  );
}

export function SkeletonRitualCard() {
  return (
    <div className="card-primary p-6">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="text" height={24} width={200} />
      </div>
      <Skeleton variant="text" height={14} width="60%" className="mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Skeleton variant="text" height={12} width={80} className="mb-2" />
            <Skeleton variant="text" height={16} width="90%" />
          </div>
        ))}
      </div>
    </div>
  );
}
