import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";

const Timer = ({
  driverId,
  isFinished,
  setDrivers,
  finishedTime,
  areQualsFinished,
  onFinish,
}) => {
  const [duration, setDuration] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    const storedDuration = localStorage.getItem(`duration_${driverId}`);

    if (storedDuration) {
      setDuration(parseInt(storedDuration, 10));
    }
  }, [driverId]);

  useEffect(() => {
    let timerInterval;

    if (timerOn) {
      timerInterval = setInterval(() => {
        setDrivers((prevDrivers) => {
          return prevDrivers.map((driver) => {
            if (driver.id === driverId) {
              return {
                ...driver,
                qualTime: areQualsFinished
                  ? driver.qualTime
                  : driver.qualTime + 10,
                finalTime: areQualsFinished
                  ? driver.finalTime + 10
                  : driver.finalTime,
              };
            }
            return driver;
          });
        });
      }, 10);
    } else {
      clearInterval(clearInterval(timerInterval));
    }

    return () => clearInterval(timerInterval); // Cleanup on unmount
  }, [timerOn, driverId, areQualsFinished]);

  useEffect(() => {
    localStorage.setItem(`duration_${driverId}`, duration?.toString());
  }, [driverId, duration]);

  const startTimer = () => {
    setTimerOn(true);
  };

  const stopTimer = () => {
    setTimerOn(false);
  };

  const resetTimer = () => {
    setTimerOn(false);
    onFinish();
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
      <div>{formatTime(finishedTime)}</div>
      <Button
        onClick={() => (!timerOn ? startTimer() : stopTimer())}
        color={!timerOn ? "success" : "error"}
        variant="contained"
        style={{ marginRight: "10px" }}
        disabled={
          (areQualsFinished !== undefined && !areQualsFinished) || isFinished
        }
      >
        {!timerOn ? "Start" : "Stop"}
      </Button>
      <Button
        onClick={resetTimer}
        color="primary"
        variant="contained"
        disabled={
          (areQualsFinished !== undefined && !areQualsFinished) || isFinished
        }
      >
        Finish
      </Button>
    </div>
  );
};

export default Timer;
