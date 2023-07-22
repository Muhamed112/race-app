// hooks/useDrivers.js

import { useEffect, useState } from "react";

const useDrivers = (key, initialValue) => {
  // Get the initial value from localStorage if it exists
  const storedValue =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;
  const [drivers, setDrivers] = useState(initial);

  // Function to update the drivers array in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("drivers", JSON.stringify(drivers));
  }, [drivers]);

  // Function to fetch the drivers array from localStorage on initial load
  useEffect(() => {
    const storedDrivers = localStorage.getItem("drivers");
    if (storedDrivers) {
      setDrivers(JSON.parse(storedDrivers));
    }
  }, []);

  const deleteDriver = (driverId) => {
    setDrivers((prevDrivers) =>
      prevDrivers.filter((driver) => driver.id !== driverId)
    );
  };

  return { drivers, setDrivers, deleteDriver };
};

export default useDrivers;
