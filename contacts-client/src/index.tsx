import React from 'react';
import ReactDOM from 'react-dom/client';
import { RelayEnvironmentProvider } from 'react-relay';
import App from './App';
import relayEnvironment from './relay/Environment';

const rootElement = document.getElementById('root') as HTMLElement;

// Clear the root element to prevent conflicts with HMR
rootElement.innerHTML = '';

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <App />
    </RelayEnvironmentProvider>
  </React.StrictMode>
);
