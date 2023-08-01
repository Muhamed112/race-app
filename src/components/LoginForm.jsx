"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email === process.env.EMAIL &&
      formData.password === process.env.PASSWORD
    ) {
      router.push("/dashboard"); // Redirect to the dashboard on successful login
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "350px",
        margin: "250px auto 0 auto",
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
        alt="logo"
      />
      <TextField
        required
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "15px" }}
      />
      <TextField
        required
        type={showPassword ? "text" : "password"}
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "15px" }}
        InputProps={{
          // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: "100%", height: "50px" }}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
