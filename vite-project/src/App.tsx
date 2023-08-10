/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const timerIsOn = useRef(false);
  const timerId = useRef(0);

const startTimer = () => {
  timerId.current = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000)
};

const stopTimer = () => {
  clearInterval(timerId.current);
  timerId.current = 0;
};

const timer = () => {
  timerIsOn.current = !timerIsOn.current;
  if (timerIsOn.current) startTimer();
  else stopTimer();
}

const renderTime = () => {
  const minutes = Math.floor((timeLeft / 60)).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
};

  return (
      <>
      <div>
      <a href="https://vitejs.dev" target="_blank">
      <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
      <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      </div>
      {/* boilerplate above*/}

      <h1>Jacint's Clock</h1>
      <div id="break-label">Break Length</div>
      <div id="session-label">Session Length</div>
      <button id="break-decrement" onClick={() => {
        if (breakLength === 1) return;
        setBreakLength(prevLength => prevLength - 1);
      }}>
      - break
      </button>
      <button id="session-decrement" onClick={() => {
        if (sessionLength === 1) return;
        stopTimer();
        timerIsOn.current = false;
        setSessionLength(prevLength => prevLength - 1);
        setTimeLeft((sessionLength - 1) * 60);
      }}>
      - session
      </button>
      <button id="break-increment" onClick={() => {
        if (breakLength === 60) return;
        setBreakLength(prevLength => prevLength + 1);
      }}>
      + break
      </button>
      <button id="session-increment" onClick={() => {
        if (sessionLength === 60) return;
        stopTimer();
        timerIsOn.current = false;
        setSessionLength(prevLength => prevLength + 1);
        setTimeLeft((sessionLength + 1) * 60);
        }}>
      + session
      </button>
  <div id="break-length">{breakLength}</div>
  <div id="session-length">{sessionLength}</div> 
    <div id="timer-label">Session</div>
    <div id="time-left">{renderTime()}</div>
    <button id="start_stop" onClick={timer}>
      start / stop
      </button>
    <button id="reset" onClick={() => {
      stopTimer();
      timerIsOn.current = false;
      setBreakLength(5);
      setSessionLength(25);
      setTimeLeft(25 * 60);
    }}>
  reset
    </button>

    {/* boilerplate below */}
  {/*
      <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
      </button>
      <p>
      Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      </div>
      */}
  <p className="read-the-docs">
    Click on the Vite and React logos to learn more
    </p>
    </>
    )
}

export default App
