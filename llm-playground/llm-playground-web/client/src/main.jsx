import React from 'react';
import ReactDOM from 'react-dom/client';
import InteractorInputView from './views/interactor-input-view/InteractorInputView';
import AppStateProvider from './app-state/AppStateProvider';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppStateProvider>
            <App />
        </AppStateProvider>
    </React.StrictMode>
);
