import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from "@sentry/react";
import './index.css'
import App from './App.tsx'

Sentry.init({
  dsn: "https://71c0a71dc25db5050a560a102fc98be0@o4510085703860224.ingest.de.sentry.io/4510085706874960",
  sendDefaultPii: true
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
