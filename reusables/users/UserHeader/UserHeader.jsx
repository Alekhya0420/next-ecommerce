// "use client";
// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
// import { Menu as MenuIcon, AccountCircle as AccountCircleIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
// import Link from 'next/link';
// import supabase from '../../../src/config/superbaseClient';

// const UserHeader = () => {
//   const [cartNo, setCartNo] = useState(0);

//   const user = localStorage.getItem("user");
//   const cust_id = user ? JSON.parse(user).id : null;

//   if (!cust_id) {
//     console.log("No user found in localStorage");
//   }

//   useEffect(() => {
//     if (cust_id) {
//       const CartNumber = async () => {
//         const { data, error, count } = await supabase
//           .from('orders')
//           .select('quantity', { count: 'exact' })
//           .eq('user_id', cust_id);

//         if (error) {
//           console.log("There is an issue in it");
//         } else {
//           const totalQuantity = data.reduce((acc, item) => acc + item.quantity, 0);
//           setCartNo(totalQuantity);
//         }
//       };
//       CartNumber();
//     }
//   }, [cust_id]);

//   console.log("quantity is", cartNo);

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         backgroundColor: '#e0e0e0',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//       }}
//     >
//       <Toolbar sx={{ display: 'flex', gap: '20px' }}>
//         <IconButton edge="start" color="inherit" aria-label="menu" sx={{ ml: 1 }}>
//           <MenuIcon />
//         </IconButton>

//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: '200',
//             color: '#333',
//             textDecoration:"underline",
//             marginTop:"1px"
//           }}
//         >
//         <Link href="/userDashboard">  
//           User-Dashboard
//         </Link>  
//         </Typography>

//         <div style={{ display: 'flex', gap: '10px' }}>
//           <Link href="/userDashboard/user-order">
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: '200',
//                 color: '#333',
//                 marginTop:"6px",
//                 textDecoration:"underline",
//                 '&:hover': {
//                   color: '#e91e63', // Change to your desired hover color
//                 }
//               }}
//             >
//               Orders
//             </Typography>
//           </Link>

//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: '200',
//               marginTop:"6px",
//               color: '#333',
//               '&:hover': {
//                 color: '#e91e63',
//               }
//             }}
//           >
//             Cart({cartNo})
//           </Typography>

//           {/* Wishlist Link */}
//           <Link href="/wish-list">
//           <IconButton color="inherit">
//     <h5 style={{textDecoration:"underline",color:"#333",marginTop:"1px"}}>wishlist</h5><FavoriteIcon sx={{color:'#e91e63' }} />
//           </IconButton>
//           </Link>
//         </div>

//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: '#e91e63', 
//             color: '#fff',
//             borderRadius: '50%', 
//             padding: '8px 16px',
//           }}
//         >
//           <AccountCircleIcon />
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default UserHeader;


"use client";
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { Menu as MenuIcon, AccountCircle as AccountCircleIcon, Favorite as FavoriteIcon } from "@mui/icons-material";
import Link from "next/link";
import supabase from "../../../src/config/superbaseClient";

const UserHeader = () => {
  const [cartNo, setCartNo] = useState(0);
  const [custId, setCustId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : null;
      setCustId(parsedUser ? parsedUser.id : null);
    }
  }, []);

  useEffect(() => {
    if (custId) {
      const fetchCartNumber = async () => {
        const { data, error } = await supabase
          .from("orders")
          .select("quantity")
          .eq("user_id", custId);

        if (error) {
          console.log("There is an issue fetching cart data:", error);
        } else {
          const totalQuantity = data.reduce((acc, item) => acc + item.quantity, 0);
          setCartNo(totalQuantity);
        }
      };
      fetchCartNumber();
    }
  }, [custId]);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#e0e0e0",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", gap: "20px" }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ ml: 1 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ fontWeight: "200", color: "#333", textDecoration: "underline", marginTop: "1px" }}>
          <Link href="/userDashboard">User-Dashboard</Link>
        </Typography>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/userDashboard/user-order">
            <Typography
              variant="h6"
              sx={{
                fontWeight: "200",
                color: "#333",
                marginTop: "6px",
                textDecoration: "underline",
                "&:hover": { color: "#e91e63" },
              }}
            >
              Orders
            </Typography>
          </Link>

          <Typography variant="h6" sx={{ fontWeight: "200", marginTop: "6px", color: "#333", "&:hover": { color: "#e91e63" } }}>
            Cart({cartNo})
          </Typography>

          <Link href="/wish-list">
            <IconButton color="inherit">
              <h5 style={{ textDecoration: "underline", color: "#333", marginTop: "1px" }}>wishlist</h5>
              <FavoriteIcon sx={{ color: "#e91e63" }} />
            </IconButton>
          </Link>
        </div>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#e91e63",
            color: "#fff",
            borderRadius: "50%",
            padding: "8px 16px",
          }}
        >
          <AccountCircleIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
