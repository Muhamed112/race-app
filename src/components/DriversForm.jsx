"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useDrivers from "@/hooks/useDrivers";
import CountrySelect from "./CountryDropdown";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 to generate unique ids
import Image from "next/image";

const DriversForm = () => {
  const [formData, setFormData] = useState({
    country: "",
    firstName: "",
    lastName: "",
    driverNumber: "",
    motor: "",
    team: "",
  });
  const { setDrivers } = useDrivers("drivers", []);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCountryChange = (countryCode) => {
    setFormData((prevData) => ({
      ...prevData,
      country: countryCode, // Update the selected country code
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDriver = {
      ...formData,
      id: uuidv4(), // Generate a unique id and include it in the new driver object
    };
    setDrivers((prevDrivers) => [...prevDrivers, newDriver]);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "350px",
        margin: "150px auto 0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        src="/logo.jpg"
        height={100}
        width={100}
        style={{
          marginBottom: "30px",
        }}
      />
      <CountrySelect onCountryChange={handleCountryChange} />
      <TextField
        required
        label="Ime"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "15px" }}
      />
      <TextField
        required
        label="Prezime"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "15px" }}
      />

      <TextField
        required
        label="Broj vozaca"
        name="driverNumber"
        value={formData.driverNumber}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "15px" }}
      />

      <TextField
        required
        label="Motor"
        name="motor"
        value={formData.motor}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "15px" }}
      />

      <TextField
        label="Tim"
        name="team"
        value={formData.team}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "15px" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: "100%", height: "50px" }}
      >
        Dodaj vozaca
      </Button>
    </form>
  );
};

export default DriversForm;
