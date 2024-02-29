// App.js

import React, { useState, useEffect } from 'react';
import './SplitScreenPage.css';
import { useAppState } from './app-state/AppStateProvider';
import StoryBodyView from './views/content-view/StoryBodyView';
import storyConfig from './story/story-config';
import InteractorInputView from './views/interactor-input-view/InteractorInputView';

import Remorse from '../public/images/remorse.webp';
import Happy from '../public/images/happy.webp';
import Angry from '../public/images/angry.webp';
import Sad from '../public/images/sad.webp';
import Neutral from '../public/images/angry.webp';

import House from '../public/images/house.webp';
import MurederRoom from '../public/images/murderRoom.webp';
import photo from '../public/images/photo.png';
import FootPrints from '../public/images/FootPrints.png';

function SplitScreenPage() {
    const [inputText, setInputText] = useState('');
    const [leftImageIndex, setLeftImageIndex] = useState(0);
    const [rightImageIndex, setRightImageIndex] = useState(0);

    const leftImages = [Sad, Happy, Angry, Remorse, Neutral];
    const rightImages = [House, MurederRoom, photo, FootPrints];

    const state = useAppState(0);

    useEffect(() => {

        if (state.emotion.toLowerCase().includes('sad')) {
            setLeftImageIndex(0);
        } else if (state.emotion.toLowerCase().includes('happy')) {
            setLeftImageIndex(1);
        } else if (state.emotion.toLowerCase().includes('angry')) {
            setLeftImageIndex(2);
        } else if (state.emotion.toLowerCase().includes('remorse')) {
            setLeftImageIndex(3);
        } else if (state.emotion.toLowerCase().includes('neutral')) {
            setLeftImageIndex(4);
        }
        setInputText('');
    }, [state.emotion]);

    const handleRightArrowClick = () => {
        setRightImageIndex((rightImageIndex + 1) % rightImages.length);
    };

    const handleLeftArrowClick = () => {
        const newIndex = rightImageIndex - 1 < 0 ? rightImages.length - 1 : rightImageIndex - 1;
        setRightImageIndex(newIndex);
    };

    return (
            <div>
                <h2>True Detective</h2>
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
    );
}

export default SplitScreenPage;
