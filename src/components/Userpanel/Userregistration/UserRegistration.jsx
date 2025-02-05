"use client";
import React, { useState } from "react";
import supabase from "../../../config/superbaseClient";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";
import { Box, Button, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";
import Link from "next/link";

const UserRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submitUser = async (e) => {
    e.preventDefault();
    setError("");
    const normalizedEmail = email.toLowerCase();

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const { data, error } = await supabase.from("users").insert([
        { name, email: normalizedEmail, password: hashedPassword, country },
      ]);

      if (error) {
        setError(error.message);
        console.log("Error:", error);

        // Show SweetAlert for error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      } else {
        console.log("User added successfully:", data);

        // Show SweetAlert for success
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User added successfully",
          confirmButtonColor: "#3085d6",
        });

        // Clear form fields
        setName("");
        setEmail("");
        setPassword("");
        setCountry("");
      }
    } catch (err) {
      setError(err.message);
      console.error("Unexpected error:", err);

      // Show SweetAlert for unexpected errors
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    }
  };

  return (
    <Box sx={{ justifyContent: "center", alignItems: "center", height: "100vh", display: "flex" }}>
      <Box
        sx={{
          width: "400px",
          border: "1px solid red",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
        className="signup-container"
      >
        <Box className="signup-box">
          <Typography variant="h5" className="signup-title">
            <span className="signup-text">Sign Up</span>
          </Typography>
          <form onSubmit={submitUser} className="signup-form">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="signup-input"
            />
            <TextField
              label="Email Address"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="signup-input"
            />
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="signup-input"
              InputProps={{
                endAdornment: (
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    👁
                  </span>
                ),
              }}
            />
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              margin="normal"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="signup-input"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  required
                  className="signup-checkbox"
                />
              }
              label={
                <span>
                  I agree to the <Link href="#">Terms of Service</Link> and{" "}
                  <Link href="#"> Privacy Policy</Link>
                </span>
              }
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={!agree}
              sx={{ backgroundColor: "orange" }}
              className="signup-button"
            >
              Sign Up →
            </Button>
          </form>
          {error && <Typography color="error" className="signup-error">{error}</Typography>}
          <Typography className="signup-footer">
            Already have an account?{" "}
            <Link href="/user-login" className="signup-login-link" underline="hover">
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserRegistration;
