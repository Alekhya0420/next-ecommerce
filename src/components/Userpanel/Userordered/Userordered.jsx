
// "use client";
// import React, { useState, useEffect } from 'react';
// import UserHeader from '../../../../reusables/users/UserHeader/UserHeader';
// import UserFooter from '../../../../reusables/users/UserFooter/UserFooter';
// import UserSlidebar from '../../../../reusables/users/UserSlidebar/UserSlidebar';
// import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, Divider } from "@mui/material";
// import supabase from '../../../config/superbaseClient';

// const Userordered = () => {
//   const [orderedProducts, setOrdered] = useState([]);
//   const customer_id = JSON.parse(localStorage.getItem("user")).id;

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const { data, error } = await supabase.from('orders').select('*').eq('user_id', customer_id);

//         if (error) {
//           console.error("Error fetching orders:", error);
//         } else {
//           setOrdered(data);
//         }
//       } catch (err) {
//         console.error("An error occurred:", err);
//       }
//     };

//     fetchOrders();
//   }, [customer_id]);

//   const handleDeleteOrder = async (orderId) => {
//     try {
//       const { error } = await supabase.from('orders').delete().eq('id', orderId);
//       if (error) {
//         console.error("Error deleting order:", error);
//       } else {
//         setOrdered((prevOrders) => prevOrders.filter(order => order.id !== orderId));
//       }
//     } catch (err) {
//       console.error("An error occurred while deleting the order:", err);
//     }
//   };

//   const totalAmount = orderedProducts.reduce((total, order) => total + order.total_price, 0);

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginBottom: "150px" }}>
//       <UserHeader />
//       <Box sx={{ display: 'flex' }}>
//         <UserSlidebar />
//         <Box sx={{ marginTop: "100px", marginLeft: "260px", padding: "20px", flex: 1 }}>
//           <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, textAlign: 'center' }}>Your Orders</Typography>
//           <Grid container spacing={3}>
//             {orderedProducts.map((order) => (
//               <Grid item xs={12} key={order.id}>
//                 <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', boxShadow: 5, borderRadius: 3, padding: 2, backgroundColor: "#f8f9fa" }}>
//                   {/* Image Section */}
//                   <CardMedia
//                     component="img"
//                     image={order.product_image}
//                     alt={order.product_name}
//                     sx={{ width: 140, height: 140, borderRadius: 3, objectFit: 'cover', border: "1px solid #e91e63" }}
//                   />
                  
//                   {/* Description Section */}
//                   <CardContent sx={{ flex: 2, textAlign: 'center' }}>
//                     <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>{order.product_name}</Typography>
//                     <Typography variant="body2" sx={{ color: "#777" }}>Price: ${order.product_price.toFixed(2)}</Typography>
//                     <Typography variant="body2" sx={{ color: "#777" }}>Quantity: {order.quantity}</Typography>
//                     <Typography variant="h6" sx={{ marginTop: 1, color: '#e91e63', fontWeight: 'bold' }}>
//                       Total: ${order.total_price.toFixed(2)}
//                     </Typography>
//                   </CardContent>
                  
//                   {/* Buttons Section */}
//                   <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                     <Button variant="contained" color="primary" href={`/userDashboard/user-order/${order.product_id}`} sx={{ borderRadius: 5, marginBottom: 1 }}>View Details</Button>
//                     <Button variant="contained" color="error" onClick={() => handleDeleteOrder(order.id)} sx={{ borderRadius: 5 }}>Delete Order</Button>
//                   </Box>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//           {/* Total Amount Section */}
//           <Box sx={{ marginTop: 4, textAlign: 'left', padding: 2, backgroundColor: '#f1f1f1', borderRadius: 2, boxShadow: 3 }}>
//             <Divider sx={{ marginBottom: 1 }} />
//             <Typography variant="h6" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>Total Amount: ${totalAmount.toFixed(2)}</Typography>
//           </Box>
//         </Box>
//       </Box>
//       <Box sx={{ marginTop: 'auto' }}>
//         <UserFooter />
//       </Box>
//     </Box>
//   );
// };

// export default Userordered;


"use client";  // Ensure this is present at the top

import React, { useState, useEffect } from 'react';
import UserHeader from '../../../../reusables/users/UserHeader/UserHeader';
import UserFooter from '../../../../reusables/users/UserFooter/UserFooter';
import UserSlidebar from '../../../../reusables/users/UserSlidebar/UserSlidebar';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, Divider } from "@mui/material";
import supabase from '../../../config/superbaseClient';

const Userordered = () => {
  const [orderedProducts, setOrdered] = useState([]);
  const [customerId, setCustomerId] = useState(null);

  // ✅ Access `localStorage` inside `useEffect` to avoid SSR errors
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.id) {
        setCustomerId(user.id);
      }
    }
  }, []);

  useEffect(() => {
    if (customerId) {
      const fetchOrders = async () => {
        try {
          const { data, error } = await supabase.from('orders').select('*').eq('user_id', customerId);
          if (error) {
            console.error("Error fetching orders:", error);
          } else {
            setOrdered(data);
          }
        } catch (err) {
          console.error("An error occurred:", err);
        }
      };

      fetchOrders();
    }
  }, [customerId]); // ✅ Fetch only when `customerId` is available

  const handleDeleteOrder = async (orderId) => {
    try {
      const { error } = await supabase.from('orders').delete().eq('id', orderId);
      if (error) {
        console.error("Error deleting order:", error);
      } else {
        setOrdered((prevOrders) => prevOrders.filter(order => order.id !== orderId));
      }
    } catch (err) {
      console.error("An error occurred while deleting the order:", err);
    }
  };

  const totalAmount = orderedProducts.reduce((total, order) => total + order.total_price, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginBottom: "150px" }}>
      <UserHeader />
      <Box sx={{ display: 'flex' }}>
        <UserSlidebar />
        <Box sx={{ marginTop: "100px", marginLeft: "260px", padding: "20px", flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, textAlign: 'center' }}>Your Orders</Typography>
          <Grid container spacing={3}>
            {orderedProducts.map((order) => (
              <Grid item xs={12} key={order.id}>
                <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', boxShadow: 5, borderRadius: 3, padding: 2, backgroundColor: "#f8f9fa" }}>
                  <CardMedia
                    component="img"
                    image={order.product_image}
                    alt={order.product_name}
                    sx={{ width: 140, height: 140, borderRadius: 3, objectFit: 'cover', border: "1px solid #e91e63" }}
                  />
                  <CardContent sx={{ flex: 2, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>{order.product_name}</Typography>
                    <Typography variant="body2" sx={{ color: "#777" }}>Price: ${order.product_price.toFixed(2)}</Typography>
                    <Typography variant="body2" sx={{ color: "#777" }}>Quantity: {order.quantity}</Typography>
                    <Typography variant="h6" sx={{ marginTop: 1, color: '#e91e63', fontWeight: 'bold' }}>
                      Total: ${order.total_price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button variant="contained" color="primary" href={`/userDashboard/user-order/${order.product_id}`} sx={{ borderRadius: 5, marginBottom: 1 }}>View Details</Button>
                    <Button variant="contained" color="error" onClick={() => handleDeleteOrder(order.id)} sx={{ borderRadius: 5 }}>Delete Order</Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ marginTop: 4, textAlign: 'left', padding: 2, backgroundColor: '#f1f1f1', borderRadius: 2, boxShadow: 3 }}>
            <Divider sx={{ marginBottom: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>Total Amount: ${totalAmount.toFixed(2)}</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: 'auto' }}>
        <UserFooter />
      </Box>
    </Box>
  );
};

export default Userordered;
