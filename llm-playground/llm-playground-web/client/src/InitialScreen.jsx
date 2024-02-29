// InitialScreen.js
import './InitialScreen.css';
import React from 'react';
import House from '../public/images/newHouse.png';


function InitialScreen({ onStartButtonClick }) {
    return (
        <div className="initial-screen">
            <h1>Welcome to True Detective</h1>
            <div className="opening_lines">
                <p>A horrible crime commited, An entire Family... dead. But where is Sarah? the little girl?</p>
                <p>
                    It's your job to figure out who did it and find her!</p>
                    <p> The neighbors pointed to Mr. Thompson, the
                    only one not standing in front of the house.
                </p>
                <p>He's the prime suspect.</p>
            </div>
            <img src={House} alt="Start" className="start-image" />
            <button onClick={onStartButtonClick}>Start</button>
        </div>
    );
}

export default InitialScreen;
