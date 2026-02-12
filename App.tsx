import React, { useState, useEffect, lazy, Suspense } from 'react';
import AuthProvider from './components/Auth/AuthProvider';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import WelcomeMessage from './components/Auth/WelcomeMessage';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import ResetPassword from './components/Auth/ResetPassword';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { FeedbackButton } from './components/Feedback/FeedbackButton';
import { CookieBanner } from './components/Legal/CookieBanner';
import { LegalFooter } from './components/Legal/LegalFooter';
import { useUserData } from './hooks/useUserData';
import { useOnboarding } from './hooks/useOnboarding';
import { useRouteRestoration } from './hooks/useRouteRestoration';
import { DataCacheProvider } from './contexts/DataCacheContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import { supabase } from './lib/supabase';
import Onboarding from './components/Onboarding/Onboarding';

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Goals = lazy(() => import('./components/Goals/Goals'));
const TimeManagement = lazy(() => import('./components/TimeManagement/TimeManagement'));
const Tools = lazy(() => import('./components/Tools/Tools'));
const Exercises = lazy(() => import('./components/Exercises/Exercises'));
const Habits = lazy(() => import('./components/Habits/Habits'));
const Motivation = lazy(() => import('./components/Motivation/Motivation'));
const Resources = lazy(() => import('./components/Resources/Resources'));
const Achievements = lazy(() => import('./components/Achievements/Achievements'));
const Quiz = lazy(() => import('./components/Quiz/Quiz'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const YourPath = lazy(() => import('./components/YourPath/YourPath'));
const MorningRitual = lazy(() => import('./features/morningRitual/MorningRitual'));
const Settings = lazy(() => import('./components/Settings/Settings'));

// Extensión para Date para obtener la semana del año
declare global {
  interface Date {
    getWeek(): number;
  }
}

Date.prototype.getWeek = function() {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};
function App() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [recommendedPhase, setRecommendedPhase] = useState<string | undefined>(undefined);
  const [isResetPassword, setIsResetPassword] = useState(false);

  useEffect(() => {
    const checkPasswordRecovery = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get('type');

      if (type === 'recovery') {
        setIsResetPassword(true);
      }
    };

    checkPasswordRecovery();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsResetPassword(true);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isResetPassword) {
    return (
      <LanguageProvider>
        <AuthProvider>
          <ResetPassword onComplete={() => setIsResetPassword(false)} />
        </AuthProvider>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <ToastProvider>
        <AuthProvider>
          <DataCacheProvider>
            <ProtectedRoute>
              <AppContent
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              isSidebarCollapsed={isSidebarCollapsed}
              setIsSidebarCollapsed={setIsSidebarCollapsed}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              showSettings={showSettings}
              setShowSettings={setShowSettings}
              recommendedPhase={recommendedPhase}
              setRecommendedPhase={setRecommendedPhase}
            />
            </ProtectedRoute>
          </DataCacheProvider>
        </AuthProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}

interface AppContentProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  recommendedPhase: string | undefined;
  setRecommendedPhase: (phase: string | undefined) => void;
}

function AppContent({
  currentSection,
  setCurrentSection,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  showSettings,
  setShowSettings,
  recommendedPhase,
  setRecommendedPhase
}: AppContentProps) {
  const [user, setUser] = useUserData();
  const { shouldShowOnboarding, completeOnboarding, skipOnboarding } = useOnboarding();
  const { getRestoredRoute } = useRouteRestoration(currentSection);

  // Restore route on mount if user is authenticated
  useEffect(() => {
    if (user && !shouldShowOnboarding) {
      const restoredRoute = getRestoredRoute();
      if (restoredRoute) {
        console.log('🔄 Restaurando ruta:', restoredRoute);
        setCurrentSection(restoredRoute);
      }
    }
  }, [user, shouldShowOnboarding]);

  useEffect(() => {
    if (currentSection !== 'resources' && currentSection !== 'quiz' && recommendedPhase) {
      setRecommendedPhase(undefined);
    }
  }, [currentSection, recommendedPhase]);

  const renderCurrentSection = () => {
    if (!user) return null;

    switch (currentSection) {
      case 'dashboard':
        return <Dashboard user={user} onSectionChange={setCurrentSection} />;
      case 'goals':
        return <Goals onNavigateToSection={setCurrentSection} />;
      case 'habits':
        return <Habits />;
      case 'yourpath':
        return <YourPath />;
      case 'profile':
        return <Profile user={user} onUpdateUser={setUser} onOpenSettings={() => setShowSettings(true)} />;
      case 'time':
        return <TimeManagement />;
      case 'tools':
        return <Tools />;
      case 'exercises':
        return <Exercises />;
      case 'motivation':
        return <Motivation />;
      case 'resources':
        return <Resources initialPhase={recommendedPhase} onSectionChange={setCurrentSection} />;
      case 'quiz':
        return <Quiz onNavigateToSection={(section, phase) => {
          setRecommendedPhase(phase);
          setCurrentSection(section);}} />;
      case 'achievements':
        return <Achievements user={user} />;
      case 'ritual':
        return <MorningRitual onComplete={() => setCurrentSection('dashboard')} />;
      default:
        return <Dashboard user={user} onSectionChange={setCurrentSection} />;
    }
  };

  return (
    <>
      <WelcomeMessage />

      {shouldShowOnboarding && (
        <Onboarding
          onComplete={completeOnboarding}
          onSkip={skipOnboarding}
          onNavigate={setCurrentSection}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        <Sidebar
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {user && (
          <Header
            user={user}
            isCollapsed={isSidebarCollapsed}
            onOpenSettings={() => setShowSettings(true)}
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onNavigate={setCurrentSection}
          />
        )}

        <main className={`transition-all duration-300 pt-28 pb-8 px-4 lg:px-6 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        } ml-0`}>
          <div className="max-w-7xl mx-auto">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner size="lg" message="Cargando..." />}>
                {renderCurrentSection()}
              </Suspense>
            </ErrorBoundary>
          </div>

          <LegalFooter />
        </main>

        {showSettings && user && (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner size="md" />}>
              <Settings
                user={user}
                onUpdateUser={setUser}
                onClose={() => setShowSettings(false)}
              />
            </Suspense>
          </ErrorBoundary>
        )}

        <FeedbackButton />
        <CookieBanner />
        </div>
    </>
  );
}

export default App;