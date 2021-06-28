import React, { useState, useRef } from 'react';

import './Timer.css';


function Timer() {


    const [timer, setTimer] = useState(60)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const increment = useRef<any>()

    const handleStart = () => {
        setIsActive(true)
        setIsPaused(true)
        increment.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handlePause = () => {
        clearInterval(increment.current)
        setIsPaused(false)
    }

    const handleResume = () => {
        setIsPaused(true)
        increment.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handleReset = () => {
        clearInterval(increment.current)
        setIsActive(false)
        setIsPaused(false)
        setTimer(0)
    }

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes:any = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

    return (
            <div>
                <p>{formatTime()}</p>
                    {
                        !isActive && !isPaused ?
                            <button onClick={handleStart}>Start</button>
                            : (
                                isPaused ? <button onClick={handlePause}>Pause</button> :
                                    <button onClick={handleResume}>Resume</button>
                            )
                    }
                    <button onClick={handleReset} disabled={!isActive}>Reset</button>
            </div>
    );
}

export default Timer;