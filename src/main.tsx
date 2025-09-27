import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { datadogRum } from '@datadog/browser-rum';
import { reactPlugin } from '@datadog/browser-rum-react';
import { ErrorBoundary } from "@datadog/browser-rum-react"
import { StrictMode } from 'react';



datadogRum.init({
  applicationId: import.meta.env.VITE_DATADOG_APPLICATION_ID,
  clientToken: import.meta.env.VITE_DATADOG_CLIENT_TOKEN,
  site: import.meta.env.VITE_DATADOG_SITE,
  service: import.meta.env.VITE_DATADOG_SERVICE,
  env: import.meta.env.VITE_DATADOG_ENV,
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  defaultPrivacyLevel: "mask-user-input",
  plugins: [reactPlugin({ router: false })],
});

datadogRum.addAction("🚀 App initialized", { service: import.meta.env.VITE_DATADOG_SERVICE });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={() => <p>Something went wrong</p>}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
