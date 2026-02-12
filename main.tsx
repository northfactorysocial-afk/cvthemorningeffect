import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import EnvErrorFallback from './components/EnvErrorFallback';
import { validateEnvironment } from './utils/validateEnv';
import { registerServiceWorker } from './utils/registerServiceWorker';

const validation = validateEnvironment();
registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      {validation.isValid ? (
        <App />
      ) : (
        <EnvErrorFallback errors={validation.errors} warnings={validation.warnings} />
      )}
    </ErrorBoundary>
  </StrictMode>
);
