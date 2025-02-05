// "use client";
// import React from "react";
// import Link from "next/link";
// import { Button, Box, Typography } from "@mui/material";

// const Frontpage = () => {
//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         backgroundColor: "#B0E0E6", // Lighter sky blue color
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "100%",
//         textAlign: "center", // Centering the text
//         padding: "20px",
//       }}
//     >
//       <Typography
//         variant="h4"
//         sx={{
//           marginBottom: "30px",
//           fontWeight: "bold",
//           color: "#333",
//           fontSize: "36px",
//         }}
//       >
//         Welcome to Our Platform!
//       </Typography>

//       <Typography
//         variant="h6"
//         sx={{
//           marginBottom: "40px",
//           color: "#555",
//           fontSize: "20px",
//         }}
//       >
//         Choose your path and get started with us today.
//       </Typography>

//       <Box sx={{ display: "flex", gap: "20px" }}>
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: "#007BFF",
//             color: "#fff",
//             fontSize: "18px",
//             "&:hover": {
//               backgroundColor: "#0056b3",
//             },
//           }}
//         >
//           <Link href="/admin-auth" style={{ textDecoration: "none", color: "inherit" }}>
//             👩‍💼 Are you Admin?
//           </Link>
//         </Button>
        
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: "#FF4500",
//             color: "#fff",
//             fontSize: "18px",
//             "&:hover": {
//               backgroundColor: "#cc3700",
//             },
//           }}
//         >
//           <Link href="/user-reg" style={{ textDecoration: "none", color: "inherit" }}>
//             🧑‍💻 Are you User?
//           </Link>
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Frontpage;


"use client";
import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";


const Frontpage = () => {
  const route = useRouter();

  const handleRedirect = () => {
    route.push("/user-login"); // Redirect to login page on click
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          onClick={handleRedirect} // Redirects when clicked
          sx={{
            padding: "30px",
            borderRadius: "15px",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            cursor: "pointer",
            transition: "0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#333",
              mb: 3,
              textTransform: "uppercase",
            }}
          >
            Welcome!
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#ff4757", fontWeight: "500" }}
          >
            Click anywhere to continue
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Frontpage;
