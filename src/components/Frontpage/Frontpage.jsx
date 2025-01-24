"use client";
import React from "react";
import Link from "next/link";
import { Button, Box, Typography } from "@mui/material";

const Frontpage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#B0E0E6", // Lighter sky blue color
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        textAlign: "center", // Centering the text
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "30px",
          fontWeight: "bold",
          color: "#333",
          fontSize: "36px",
        }}
      >
        Welcome to Our Platform!
      </Typography>

      <Typography
        variant="h6"
        sx={{
          marginBottom: "40px",
          color: "#555",
          fontSize: "20px",
        }}
      >
        Choose your path and get started with us today.
      </Typography>

      <Box sx={{ display: "flex", gap: "20px" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#007BFF",
            color: "#fff",
            fontSize: "18px",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          <Link href="/admin" style={{ textDecoration: "none", color: "inherit" }}>
            👩‍💼 Are you Admin?
          </Link>
        </Button>
        
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF4500",
            color: "#fff",
            fontSize: "18px",
            "&:hover": {
              backgroundColor: "#cc3700",
            },
          }}
        >
          <Link href="/user-reg" style={{ textDecoration: "none", color: "inherit" }}>
            🧑‍💻 Are you User?
          </Link>
        </Button>
      </Box>
    </Box>
  );
};

export default Frontpage;
