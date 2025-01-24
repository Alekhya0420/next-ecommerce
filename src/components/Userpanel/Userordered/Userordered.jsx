// app/userDashboard/user-order/page.js
// "use client"
// import React, { useState, useEffect } from 'react';
// import UserHeader from '../../../../reusables/users/UserHeader/UserHeader';
// import UserFooter from '../../../../reusables/users/UserFooter/UserFooter';
// import UserSlidebar from '../../../../reusables/users/UserSlidebar/UserSlidebar';
// import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from "@mui/material";
// import supabase from '../../../config/superbaseClient';

// const Userordered = ({ orderedProducts }) => {
//   const [ordered, setOrdered] = useState(orderedProducts);

  
//   const handleDeleteOrder = async (orderId) => {
//     try {
//       const { error } = await supabase
//         .from('orders')
//         .delete()
//         .eq('id', orderId); 
//       if (error) {
//         console.error("Error deleting order:", error);
//       } else {
//         // Update the state to remove the deleted order from the list
//         setOrdered((prevOrders) => prevOrders.filter(order => order.id !== orderId));
//       }
//     } catch (err) {
//       console.error("An error occurred while deleting the order:", err);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginBottom: "150px" }}>
//       <UserHeader />
//       <Box sx={{ display: 'flex' }}>
//         <UserSlidebar />
//         <Box sx={{ marginTop: "100px", marginLeft: "260px", padding: "20px", flex: 1 }}>
//           {/* Render ordered products */}
//           <Grid container spacing={3}>
//             {ordered.map((order, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card
//                   sx={{
//                     maxWidth: 345,
//                     boxShadow: 3,
//                     borderRadius: 2,
//                     backgroundColor: "#f1f8e9",
//                     border: "2px solid #80cbc4",
//                     "&:hover": {
//                       transform: "scale(1.05)", // Card hover effect
//                       boxShadow: 8
//                     }
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={order.product_image}
//                     alt={order.product_name}
//                     sx={{
//                       objectFit: 'cover',
//                       borderRadius: '8px 8px 0 0',
//                     }}
//                   />
//                   <CardContent sx={{ textAlign: 'center' }}>
//                     <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f3f3f' }}>
//                       {order.product_name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
//                       Price: ${order.product_price.toFixed(2)}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Quantity: {order.quantity}
//                     </Typography>
//                     <Typography variant="h6" sx={{ marginTop: 2, color: '#e91e63', fontWeight: 'bold' }}>
//                       Total: ${order.total_price.toFixed(2)}
//                     </Typography>
//                   </CardContent>
//                   <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       href={`/userDashboard/user-order/${order.product_id}`}
//                       sx={{ borderRadius: 5 }}
//                     >
//                       View Details
//                     </Button>

//                     <Button
//                       variant="contained"
//                       color="error"
//                       onClick={() => handleDeleteOrder(order.id)}
//                       sx={{ borderRadius: 5 }}
//                     >
//                       Delete Order
//                     </Button>
//                   </Box>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       </Box>

//       {/* Footer positioned at the bottom */}
//       <Box sx={{ marginTop: 'auto' }}>
//         <UserFooter />
//       </Box>
//     </Box>
//   );
// };

// // Fetch the user ID client-side and pass it to the server-side
// export async function getServerSideProps(context) {
//   const user = context.req.cookies.user; // Access the cookie that stores user ID
  
//   // If the user cookie is missing, return an empty list of orders
//   if (!user) {
//     return { props: { orderedProducts: [] } };
//   }

//   const customer_id = JSON.parse(user).id;  // Get customer ID from the cookie
//   try {
//     const { data, error } = await supabase.from('orders').select('*').eq('user_id', customer_id);

//     if (error) {
//       console.error("Error fetching orders:", error);
//       return { props: { orderedProducts: [] } };
//     }

//     return {
//       props: { orderedProducts: data || [] },  // Pass the fetched data as props
//     };
//   } catch (err) {
//     console.error("Error fetching orders:", err);
//     return { props: { orderedProducts: [] } };
//   }
// }

// export default Userordered;


"use client";
import React, { useState, useEffect } from 'react';
import UserHeader from '../../../../reusables/users/UserHeader/UserHeader';
import UserFooter from '../../../../reusables/users/UserFooter/UserFooter';
import UserSlidebar from '../../../../reusables/users/UserSlidebar/UserSlidebar';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from "@mui/material";
import supabase from '../../../config/superbaseClient';

const Userordered = ({ orderedProducts = [] }) => {
  const [ordered, setOrdered] = useState(orderedProducts);

  
  const handleDeleteOrder = async (orderId) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) {
        console.error("Error deleting order:", error);
      } else {
        
        setOrdered((prevOrders) => prevOrders.filter(order => order.id !== orderId));
      }
    } catch (err) {
      console.error("An error occurred while deleting the order:", err);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginBottom: "150px" }}>
      <UserHeader />
      <Box sx={{ display: 'flex' }}>
        <UserSlidebar />
        <Box sx={{ marginTop: "100px", marginLeft: "260px", padding: "20px", flex: 1 }}>
          {/* Check if there are orders */}
          {ordered && ordered.length > 0 ? (
            <Grid container spacing={3}>
              {ordered.map((order, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      boxShadow: 3,
                      borderRadius: 2,
                      backgroundColor: "#f1f8e9",
                      border: "2px solid #80cbc4",
                      "&:hover": {
                        transform: "scale(1.05)", // Card hover effect
                        boxShadow: 8
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={order.product_image}
                      alt={order.product_name}
                      sx={{
                        objectFit: 'cover',
                        borderRadius: '8px 8px 0 0',
                      }}
                    />
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f3f3f' }}>
                        {order.product_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                        Price: ${order.product_price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {order.quantity}
                      </Typography>
                      <Typography variant="h6" sx={{ marginTop: 2, color: '#e91e63', fontWeight: 'bold' }}>
                        Total: ${order.total_price.toFixed(2)}
                      </Typography>
                    </CardContent>
                    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        href={`/userDashboard/user-order/${order.product_id}`}
                        sx={{ borderRadius: 5 }}
                      >
                        View Details
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteOrder(order.id)}
                        sx={{ borderRadius: 5 }}
                      >
                        Delete Order
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px' }}>
              No orders available.
            </Typography>
          )}
        </Box>
      </Box>

      {/* Footer positioned at the bottom */}
      <Box sx={{ marginTop: 'auto' }}>
        <UserFooter />
      </Box>
    </Box>
  );
};

// Fetch the user ID client-side and pass it to the server-side
export async function getServerSideProps(context) {
  const user = context.req.cookies.user; // Access the cookie that stores user ID
  
  // If the user cookie is missing, return an empty list of orders
  if (!user) {
    return { props: { orderedProducts: [] } };
  }

  const customer_id = JSON.parse(user).id;  // Get customer ID from the cookie
  try {
    const { data, error } = await supabase.from('orders').select('*').eq('user_id', customer_id);

    if (error) {
      console.error("Error fetching orders:", error);
      return { props: { orderedProducts: [] } };
    }

    return {
      props: { orderedProducts: data || [] }, 
    };
  } catch (err) {
    console.error("Error fetching orders:", err);
    return { props: { orderedProducts: [] } };
  }
}

export default Userordered;
