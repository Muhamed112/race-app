import { Button } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

const Timer = ({ isAllTimersOn }) => {
  const [duration, setDuration] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const timerIntervalRef = useRef();

  useEffect(() => {
    let timerInterval = timerIntervalRef.current;

    if (timerOn) {
      timerInterval = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 10); // Update every 10 milliseconds
      }, 10);
    } else {
      clearInterval(clearInterval(timerInterval));
    }

    return () => clearInterval(timerInterval); // Cleanup on unmount
  }, [timerOn]);

  const startTimer = () => {
    setTimerOn(true);
  };

  const stopTimer = () => {
    setTimerOn(false);
  };

  const resetTimer = () => {
    // setDuration(timerIntervalRef.current);
    setTimerOn(false);
    setDisabled(true);
  };

  // Helper function to format time as minutes, seconds, and milliseconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
  };

  return (
    <div>
      <div>{formatTime(duration)}</div>
      <Button
        onClick={() => (!timerOn ? startTimer() : stopTimer())}
        color={!timerOn ? "success" : "error"}
        variant="contained"
        style={{ marginRight: "10px" }}
        disabled={disabled}
      >
        {!timerOn ? "Start" : "Stop"}
      </Button>
      <Button
        onClick={resetTimer}
        color="primary"
        variant="contained"
        disabled={disabled}
      >
        Finish
      </Button>
    </div>
  );
};

export default Timer;
