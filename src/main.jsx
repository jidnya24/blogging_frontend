import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import App from './App.jsx';
import './index.css';

// Create emotion cache
const cache = createCache({
  key: 'css',
  prepend: true,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
  </StrictMode>,
);
