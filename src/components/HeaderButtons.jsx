"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

const HeaderButtons = () => {
  return (
    <div>
      <Link href="form">
        <Button>Register</Button>
      </Link>
      <Link href="final">
        <Button>Final</Button>
      </Link>
    </div>
  );
};

export default HeaderButtons;
