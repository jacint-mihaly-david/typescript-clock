/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
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
    const minutes = Math.floor((timeLeft.current / 60)).toString().padStart(2, '0');
    const seconds = (timeLeft.current % 60).toString().padStart(2, '0');

    setRenderedTime(`${minutes}:${seconds}`);
  };

  const startTimer = async () => {
    timerId.current = setInterval(() => {
        if (timeLeft.current === 0 && phase.current === 'session') {
        setTimeLeft(breakLength * 60);
        setTimerLabel('Break');
        phase.current = 'break';
        renderTime();
        alarm();
        } else if (timeLeft.current === 0 && phase.current === 'break') {
        setTimeLeft(sessionLength * 60);
        setTimerLabel('Session');
        phase.current = 'session';
        renderTime();
        alarm();
        } else {
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
      <h1>Jacint's Clock</h1>
      <div id="flex-box">
        <div className="tag" id="session-tab">
          <div id="session-label">Session Length</div>
          <div id="session-length">{sessionLength}</div> 
          <button id="session-increment" onClick={() => {
          if (sessionLength === 60) return;
          stopTimer();
          timerIsOn.current = false;
          setSessionLength(prevLength => prevLength + 1);
          setTimeLeft((sessionLength + 1) * 60);
          renderTime();
          }}>
            +
          </button>
          <button id="session-decrement" onClick={() => {
          if (sessionLength === 1) return;
          stopTimer();
          timerIsOn.current = false;
          setSessionLength(prevLength => prevLength - 1);
          setTimeLeft((sessionLength - 1) * 60);
          renderTime();
          }}>
            -
          </button>
      </div>
      <div className="tag" id="break-tab">
        <div id="break-label">Break Length</div>
        <div id="break-length">{breakLength}</div>
        <button id="break-increment" onClick={() => {
          if (breakLength === 60) return;
          setBreakLength(prevLength => prevLength + 1);
        }}>
          +
        </button>
        <button id="break-decrement" onClick={() => {
          if (breakLength === 1) return;
          setBreakLength(prevLength => prevLength - 1);
        }}>
          -
        </button>
      </div>
    </div>
    <div id="status">
    <div id="timer-label">{timerLabel}</div>
    <div id="time-left">{renderedTime}</div>
    </div>
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
    <p className="read-the-docs">
    Click on the Vite and React logos to learn more
    </p>
    </>
    )
}

export default App
