import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProviderWrapper } from './lib/clerk.tsx'

createRoot(document.getElementById("root")!).render(
  <ClerkProviderWrapper>
    <App />
  </ClerkProviderWrapper>
);
