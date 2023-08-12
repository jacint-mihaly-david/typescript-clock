/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  // const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const timeLeft = useRef(sessionLength * 60);

  const setTimeLeft = (time: number) => {
    timeLeft.current = time;
    renderTime();
  };
  
  const timerIsOn = useRef(false);
  const timerId = useRef(0);
  const [timerLabel, setTimerLabel] = useState('Session');
  const phase = useRef('session');
  const [renderedTime, setRenderedTime] = useState(`25:00`);

  const alarm = () => {
  const audio = document.getElementById('beep') as HTMLMediaElement | null;
  if (!audio) throw new Error('Can\'t find audio element when calling alarm()');
  audio.play();
  setTimeout(() => audio.pause(), 2000);
  audio.currentTime = 0;
  }

  const resetAlarm = () => {
    const audio = document.getElementById('beep') as HTMLMediaElement | null;
    if (!audio) throw new Error('Can\'t find audio element when calling resetAlarm()');
    audio.pause();
    audio.currentTime = 0;
  }

const renderTime = () => {
  console.log('timeLeft in renderTime():', timeLeft);
  // const minutes = Math.floor((timeLeft / 60)).toString().padStart(2, '0');
  const minutes = Math.floor((timeLeft.current / 60)).toString().padStart(2, '0');
  const seconds = (timeLeft.current % 60).toString().padStart(2, '0');

  setRenderedTime(`${minutes}:${seconds}`);
};

const startTimer = async () => {
  timerId.current = setInterval(() => {
    console.log('timeLeft:', timeLeft);
    // if we run out of session time
    // if (timeLeft === 0 && phase.current === 'session') {
    if (timeLeft.current === 0 && phase.current === 'session') {
      console.log('switching to break');
      setTimeLeft(breakLength * 60);
      setTimerLabel('Break');
      phase.current = 'break';
      renderTime();
      alarm();
    // if we run out of break time
    // } else if (timeLeft === 0) {
    } else if (timeLeft.current === 0 && phase.current === 'break') {
      console.log('stopping timer');
      // stopTimer();
      setTimeLeft(sessionLength * 60);
      setTimerLabel('Session');
      phase.current = 'session';
      renderTime();
      alarm();
      // TODO: play music
    // if we are just counting down either session or break time
    } else {
      console.log('counting down');
      // setTimeLeft(prevTime => prevTime - 1);
      setTimeLeft(timeLeft.current - 1);
      renderTime();
    }
  }, 1000)
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
        renderTime();
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
        renderTime();
        }}>
      + session
      </button>
  <div id="break-length">{breakLength}</div>
  <div id="session-length">{sessionLength}</div> 
    <div id="timer-label">{timerLabel}</div>
    <div id="time-left">{renderedTime}</div>
    <audio id='beep' src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    <button id="start_stop" onClick={timer}>
      start / stop
      </button>
    <button id="reset" onClick={() => {
      stopTimer();
      timerIsOn.current = false;
      setBreakLength(5);
      setSessionLength(25);
      setTimeLeft(25 * 60);
      setTimerLabel('Session');
      phase.current = 'session';
      resetAlarm();
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
