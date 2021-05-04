import React, { useState, useEffect, useRef } from 'react'
import { GrPowerReset } from "react-icons/gr";

import './timer.css';

function Timer({ name, remove }) {
    const [sumSec, setSumSec] = useState(0);
    const [isStart, setStart] = useState(false);
    const [isCountdown, setIsCountdown] = useState(false);
    const timeDelta = useRef(1);
    const intervalID = useRef(null);

    const sec = sumSec % 60;
    const min = Math.floor(sumSec / 60) % 60;
    const hour = Math.floor(sumSec / (60*60)); 

    useEffect(() =>{
        if(isStart) {
            const _intervalID = setInterval(()=>{
                const d = timeDelta.current;
                setSumSec(v => { 
                    if(v + d <= 0) {
                        toggle();
                        return 0
                    } else {
                        return v + d;
                    }
                });
            }, 1000);
            intervalID.current = _intervalID;
        } else {
            clearInterval(intervalID.current);
            intervalID.current = null;
        }

        return () => {
            if(intervalID.current !== null)
                clearInterval(intervalID.current);
        };
    }, [isStart]);
    
    useEffect(() => {
        timeDelta.current = isCountdown ? -1 : 1;
    }, [isCountdown]);
    
    function setTime(hour, min, sec) {
        setSumSec(hour*60*60 + min*60 + sec);
    }

    function toggle(){
        setStart(isStart => !isStart);
    }

    function reset(){
        setSumSec(0);
        setStart(isStart => false);
    }

    return (
        <div className="timer">
            <div className={`title ${isStart ? 'timer-in-action' : ''}`}>
                <div className="timer-name">{name}</div>
                <div className="remover" onClick={() => {setStart(false);remove(name)}}>{'-'}</div>
            </div>
            
            <div className="time">
                <input type="text" value={hour} onChange={e=>setTime(Number(e.target.value), min, sec)}/>
                :
                <input type="text" value={min} onChange={e=>setTime(hour, Number(e.target.value), sec)}/>
                :
                <input type="text" value={sec} onChange={e=>setTime(hour, min, Number(e.target.value))}/>
            </div>
            <div className="control">
                <button onClick={toggle}>{isStart ? '||' : '>'}</button>
                <button onClick={reset}><GrPowerReset/></button>
                <button onClick={() => setIsCountdown(v => !v) }> {!isCountdown ? `timer mode` : `Countdown mode`} </button>
            </div>
        </div>
    )
}

export default Timer;
