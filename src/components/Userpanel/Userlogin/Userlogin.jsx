"use client";
import React, { useState } from "react";
import supabase from "../../../config/superbaseClient";
import bcrypt from "bcryptjs"; 
import Swal from "sweetalert2"; 
import { TextField, Button, Typography, Box, Link, Alert } from "@mui/material";

const Userlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data, error } = await supabase
        .from("users")
        .select("id,name,email,password")
        .eq("email", email)
        .single();

      const isMatch = await bcrypt.compare(password, data.password);

      if (isMatch) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.id,
            name: data.name,
            email: data.email,
          })
        );

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome, ${data.name}!`,
          confirmButtonColor: "orange",
        })
        .then(() => {
          window.location.href = "/userDashboard";
        });
        setEmail("");
        setPassword("");
       
      } 
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid email or password!",
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f7fa",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={loginSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ marginBottom: 2, backgroundColor: "orange" }}
          >
            Login
          </Button>

          <Typography variant="body2">
            Are you new?{" "}
            <Link href="/user-reg" underline="hover">
              Register Then
            </Link>
          </Typography>

        </form>
      </Box>
    </Box>
  );
};

export default Userlogin;
