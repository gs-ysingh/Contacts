import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new API
import { RelayEnvironmentProvider } from 'react-relay';
import App from './App';
import relayEnvironment from './relay/Environment';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={relayEnvironment}>
        <App />
    </RelayEnvironmentProvider>
    
  </React.StrictMode>
);
