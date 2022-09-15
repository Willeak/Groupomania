import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { AuthProvider } from './contexts/AuthProvider.js';
import './styles/index.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
      <React.StrictMode>
            <AuthProvider>
                  <App />
            </AuthProvider>
      </React.StrictMode>
);
