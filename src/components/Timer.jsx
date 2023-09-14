import React, { useState, useEffect } from "react";
import { formatTime } from "@/util/helpers";
import { Button } from "@mui/material";

const Timer = ({
  driverId,
  isFinished,
  setDrivers,
  finishedTime,
  areQualsFinished,
  onFinish,
}) => {
  const [timerOn, setTimerOn] = useState(false);

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
