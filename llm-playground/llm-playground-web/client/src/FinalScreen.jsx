// InitialScreen.js
import './FinalScreen.css';
import React from 'react';
import Remorse from '../public/images/remorse.webp';
import { useAppState } from './app-state/AppStateProvider';

function FinalScreen() {

    const { messages } = useAppState();   
    const lastMessage = messages[messages.length - 1];

    return (
        <div className="initial-screen">
            <div className="final_answer">
                <p>{lastMessage.content}</p>
            </div>
            <img src={Remorse} alt="Start" className="final-image" />
            <div className="ending_lines">
                <p>You did it!</p>
                <p>You solved the murder</p>
            </div>
        </div>
    );
}

export default FinalScreen;
