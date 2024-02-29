// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import InitialScreen from './InitialScreen';
import SplitScreenPage from './SplitScreenPage';
import FinalScreen from './FinalScreen';
import AppStateProvider from './app-state/AppStateProvider';
import { useAppState } from './app-state/AppStateProvider';

function App() {
    const [showMainScreen, setShowMainScreen] = useState(false);
    const [showFinalScreen, setShowFinalScreen] = useState(false);

    const {Done} = useAppState();

    const handleFinalScreenTrigger = () => {
        setShowFinalScreen(true);
    };

    const handleStartButtonClick = () => {
        setShowMainScreen(true);
    };

    useEffect(() => {
        if (Done === true){
            handleFinalScreenTrigger();
        }
        
    }, [Done]);

    return (
        
        <div className="app-container">
            {showFinalScreen ? (
                <FinalScreen />
            ) : showMainScreen ? (
                <SplitScreenPage onFinalScreenTrigger={handleFinalScreenTrigger} />
            ) : (
                <InitialScreen onStartButtonClick={handleStartButtonClick} />
            )}
        </div>
    );
}

export default App;
