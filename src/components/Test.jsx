"use client";
import React, { useState, useEffect, useRef } from "react";

const MultipleTimers = () => {
  const [timers, setTimers] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      // Clear interval on component unmount to prevent memory leaks
      clearInterval(intervalRef.current);
    };
  }, []);

  const startAllTimers = () => {
    // Clear any existing intervals before starting new ones
    clearInterval(intervalRef.current);

    // Start a new interval for each timer
    const newTimers = timers.map((timer) => ({
      ...timer,
      isRunning: true,
      endTime: Date.now() + timer.duration,
    }));

    setTimers(newTimers);

    // Set a new interval to update the timers
    intervalRef.current = setInterval(updateTimers, 100);
  };

  const updateTimers = () => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (!timer.isRunning) return timer;

        const remainingTime = timer.endTime - Date.now();
        if (remainingTime <= 0) {
          // Timer has completed
          return { ...timer, isRunning: false, remainingTime: 0 };
        }

        return { ...timer, remainingTime };
      })
    );
  };

  const stopTimer = (timerId) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === timerId ? { ...timer, isRunning: false } : timer
      )
    );
  };

  const addTimer = () => {
    // Add a new timer with a default duration (in milliseconds)
    setTimers((prevTimers) => [
      ...prevTimers,
      {
        id: Date.now(),
        duration: 60000, // Default duration: 60 seconds
        isRunning: false,
        endTime: Date.now(),
      },
    ]);
  };

  return (
    <div>
      <button onClick={startAllTimers}>Start All Timers</button>
      <button onClick={addTimer}>Add Timer</button>
      {timers.map((timer) => (
        <div key={timer.id}>
          <p>Remaining Time: {Math.ceil(timer.remainingTime / 1000)} seconds</p>
          {timer.isRunning && (
            <button onClick={() => stopTimer(timer.id)}>Stop Timer</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultipleTimers;
