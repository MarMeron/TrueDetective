// App.js

import React, { useState } from 'react';
import './App.css';
import Couple from '../public/images/Couple.png';

function SplitScreenPage() {
    const [leftImage, setLeftImage] = useState(0);
    const [rightImage, setRightImage] = useState(0);

    const leftImages = ['../public/images/Room_2.webp', '../public/images/Couple.png', 'left-image3.jpg'];
    const rightImages = ['right-image1.jpg', 'right-image2.jpg', '../public/images/Room.webp'];

    const changeLeftImage = (ind) => {
        setLeftImage(ind);
    };

    const changeRightImage = (ind) => {
        setRightImage(ind);
    };

    return (
        <div className="split-screen-container">
            <div className="left-pane" onClick={() => changeLeftImage(1)}>
                <img src={leftImages[leftImage]} alt="Left Image" />
                <p>This is some text at the bottom of the left pane.</p>
            </div>
            <div className="right-pane" onClick={() => changeRightImage(2)}>
                <img src={rightImages[rightImage]} alt="Right Image" />
            </div>
        </div>
    );
}

export default SplitScreenPage;
