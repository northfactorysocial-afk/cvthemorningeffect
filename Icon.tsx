import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
  alt?: string;
  decorative?: boolean;
}

const iconMap: Record<string, string> = {
  // Morning Effect Ritual Icons
  'story': '/src/icons/morningEffect/story-icon.svg',
  'intention': '/src/icons/morningEffect/intention-icon.svg',
  'action': '/src/icons/morningEffect/action-icon.svg',
  'energy': '/src/icons/morningEffect/energy-icon.svg',
  'direction': '/src/icons/morningEffect/direction-icon.svg',

  // Base Navigation Icons
  'home-modern': '/src/icons/base/home-modern.svg',
  'target-minimal': '/src/icons/base/target-minimal.svg',
  'habit-loop': '/src/icons/base/habit-loop.svg',
  'path-steps': '/src/icons/base/path-steps.svg',
  'profile-soft': '/src/icons/base/profile-soft.svg',

  // Home Icons
  'compass-soft': '/src/icons/base/compass-soft.svg',
  'target-soft': '/src/icons/base/target-soft.svg',
  'progress-line': '/src/icons/base/progress-line.svg',
  'sparkle-soft': '/src/icons/base/sparkle-soft.svg',
  'feather-soft': '/src/icons/base/feather-soft.svg',

  // Tu Camino Grid Icons
  'quiz-soft': '/src/icons/base/quiz-soft.svg',
  'library-soft': '/src/icons/base/library-soft.svg',
  'breath-soft': '/src/icons/base/breath-soft.svg',
  'question-soft': '/src/icons/base/question-soft.svg',
  'writing-soft': '/src/icons/base/writing-soft.svg',
  'sunrise-soft': '/src/icons/base/sunrise-soft.svg',
  'trophy-outline': '/src/icons/base/trophy-outline.svg',
  'chart-soft': '/src/icons/base/chart-soft.svg',
};

const iconAltTexts: Record<string, string> = {
  // Morning Effect Ritual Icons
  'story': 'Primera Historia',
  'intention': 'Primera Intención',
  'action': 'Primera Acción',
  'energy': 'Primera Energía',
  'direction': 'Primera Dirección',

  // Base Navigation Icons
  'home-modern': 'Inicio',
  'target-minimal': 'Objetivos',
  'habit-loop': 'Hábitos',
  'path-steps': 'Tu Camino',
  'profile-soft': 'Perfil',

  // Home Icons
  'compass-soft': 'Navegación',
  'target-soft': 'Meta',
  'progress-line': 'Progreso',
  'sparkle-soft': 'Destacado',
  'feather-soft': 'Ligero',

  // Tu Camino Grid Icons
  'quiz-soft': 'Quiz',
  'library-soft': 'Biblioteca',
  'breath-soft': 'Respiración',
  'question-soft': 'Pregunta',
  'writing-soft': 'Escritura',
  'sunrise-soft': 'Amanecer',
  'trophy-outline': 'Logro',
  'chart-soft': 'Gráfico',
};

const Icon = React.memo(function Icon({ name, size = 20, className = '', color = 'currentColor', alt, decorative = false }: IconProps) {
  const iconPath = iconMap[name];

  if (!iconPath) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  const altText = alt || iconAltTexts[name] || name;

  return (
    <img
      src={iconPath}
      alt={decorative ? '' : altText}
      aria-hidden={decorative ? 'true' : undefined}
      width={size}
      height={size}
      className={className}
      style={{ color }}
    />
  );
});

export default Icon;
