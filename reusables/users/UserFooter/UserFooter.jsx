import React from "react";
import { Box, Typography } from "@mui/material";

const UserFooter = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "black",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#333",
        boxShadow: "2px 1px 5px rgba(3, 2, 2, 0.1)",
        position: "fixed",
        bottom: 0,
        left: 0, 
        zIndex: 10, 
      }}
    >
      <Typography sx={{ fontSize: "14px", color: "white", marginBottom: "10px" }}>
        © 2025 Company Name. All Rights Reserved.
      </Typography>

      <Box sx={{display:"flex",gap:"50px"}}>
        
        <p style={{color:"white",fontSize:"14px",cursor:"pointer"}}>
          Privacy Policy
        </p>

        <p style={{color:"white",fontSize:"14px",cursor:"pointer"}}>
          Terms & Conditions
        </p>

        <p style={{color:"white",fontSize:"14px",cursor:"pointer"}}>
          Help
        </p>

        <p style={{ color: "white", fontSize: "14px", cursor: "pointer" }}>
          Contact no:2323231111
        </p>

      </Box>
    </Box>
  );
};

export default UserFooter;
