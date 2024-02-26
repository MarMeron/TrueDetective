// App.js

import React, { useState } from 'react';
import './App.css';
import AppStateProvider from './app-state/AppStateProvider';
import StoryBodyView from './views/content-view/StoryBodyView';
import storyConfig from './story/story-config';
import InteractorInputView from './views/interactor-input-view/InteractorInputView';
import Sad from '../public/images/sad.webp';
import Happy from '../public/images/happy.webp';
import Angry from '../public/images/angry.webp';
import House from '../public/images/house.webp';
import MurederRoom from '../public/images/murderRoom.webp';

function SplitScreenPage() {
    const [inputText, setInputText] = useState('');
    const [leftImageIndex, setLeftImageIndex] = useState(0);
    const [rightImageIndex, setRightImageIndex] = useState(0);

    const leftImages = [Sad, Happy, Angry];
    const rightImages = [House, MurederRoom];

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = () => {
        if (inputText.toLowerCase().includes('hello')) {
            setLeftImageIndex((leftImageIndex + 1) % leftImages.length);
        }
        setInputText('');
    };

    const handleRightArrowClick = () => {
        setRightImageIndex((rightImageIndex + 1) % rightImages.length);
    };

    const handleLeftArrowClick = () => {
        const newIndex = rightImageIndex - 1 < 0 ? rightImages.length - 1 : rightImageIndex - 1;
        setRightImageIndex(newIndex);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <AppStateProvider>
            <div>
                <div className="header">
                    <h1>True Detective</h1>
                </div>
                <div className="split-screen-container">
                    <div className="left-pane">
                        <img src={leftImages[leftImageIndex]} alt="Left Image" className="left-image" />
                        
                    </div>
                    <div className="text-pane">
                        <StoryBodyView />
                        <InteractorInputView />
                        
                    </div>
                    <div className="right-pane">
                        <img src={rightImages[rightImageIndex]} alt="Right Image" className="right-image" />
                        <div className="arrow-buttons">
                            <button onClick={handleLeftArrowClick} className="arrow-button">
                                Previous
                            </button>
                            <button onClick={handleRightArrowClick} className="arrow-button">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppStateProvider>
    );
}

export default SplitScreenPage;
