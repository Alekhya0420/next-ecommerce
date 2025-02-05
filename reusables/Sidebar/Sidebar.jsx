// "use client";
// import React from "react";
// import Link from "next/link";

// const Sidebar = () => {
//   return (
//     <div
//       style={{
//         width: "190px",
//         backgroundColor: "#2196F3",
//         paddingTop: "100px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//         paddingLeft: "20px",
//         color: "#fff",
//         height: "100vh",
//         position: "fixed",
//         top: 0,
//         left: 0,
//       }}
//     >
//       {["Admin Dashboard", "Orders", "Users", "Product view", "Order tracking"].map(
//         (link, index) => (
//           <div
//             key={index}
//             style={{
//               marginBottom: "20px",
//               cursor: "pointer",
//               fontSize: "20px",
//               textDecoration: "underline",
//               color: "blue",
//             }}
//           >
//             <Link href={`/${link.toLowerCase().replace(" ", "-")}`}>{link}</Link>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default Sidebar;

"use client"
import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div style={{
      width: '190px',
      backgroundColor: '#2196F3',
      paddingTop: '100px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: '20px',
      color: '#fff',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
    }}>
      <div style={{marginBottom:'20px',cursor:'pointer',fontSize:"20px",textDecoration:"underline",color:"white"}}><Link href="/admin">Admin Dashboard</Link></div>
      <div style={{marginBottom:'20px',cursor:'pointer',fontSize:"20px",textDecoration:"underline",color:"white"}}><Link href="/checkorder-list">Orders</Link></div>
      <div style={{marginBottom:'20px',cursor:'pointer',fontSize:"20px",textDecoration:"underline",color:"white"}}><Link href="/total-users">Users</Link></div>
      <div style={{marginBottom:'20px',cursor:'pointer',fontSize:"20px",textDecoration:"underline",color:"white"}}><Link href="/productview">Product view</Link></div>
      <div style={{marginBottom:'20px',cursor:'pointer',fontSize:"20px",textDecoration:"underline",color:"white"}}><Link href="/order-tracking">Order tracking</Link></div>
      <div style={{marginBottom:'20px',cursor:'pointer',fontSize:"20px",textDecoration:"underline",color:"white"}}><Link href="/review-pro">Review</Link></div>
      <div style={{marginBottom:'20px',cursor:'pointer',fontSize:"20px",textDecoration:"underline",color:"white"}}><Link href="/stock">Stock</Link></div>
      <div style={{marginBottom:'20px',cursor:'pointer',fontSize:"20px",textDecoration:"underline",color:"white"}}><Link href="/">Logout</Link></div>
    </div>
  );
};

export default Sidebar;