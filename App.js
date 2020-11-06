import React, { useEffect, useState, useRef } from 'react';

function App() {
    const START_TIME = 10;

    const [text, setText] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(START_TIME);
    const [isStart, setIsStart] = useState(false);
    const [finalResult, setFinalResult] = useState(0);
    const textareaRef = useRef(null);

    function startGame() {
        setIsStart(true);
        setTimeRemaining(START_TIME);
        setText("");
        textareaRef.current.disabled = false;
        textareaRef.current.focus();
    }

    function endGame() {
        setIsStart(false);
        const numWords = calculateWordCount(text);
        setFinalResult(numWords);
    }

    const handleChange = (e) => {
        const { value } = e.target
        setText(value);
    }

    useEffect(() => {
        if (isStart && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            endGame();
        }
    }, [isStart, timeRemaining]);

    const calculateWordCount = (text) => {
        const wordCounts = text.trim().split(' ');
        const wordLength = wordCounts.filter(word => word !== '');
        return wordLength.length;
    }

    return (
        <>
            <h1>Speed typing Game</h1>
            <textarea ref={textareaRef} disabled={!isStart} onChange={handleChange} value={text} />
            <h4>Remaining amount of time: {timeRemaining}</h4>
            <button disabled={isStart} onClick={startGame}>Start</button>
            <h1>The word count: {finalResult}</h1>
        </>
    )
}

export default App;