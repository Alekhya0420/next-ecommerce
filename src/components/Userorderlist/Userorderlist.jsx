// "use client";
// import { useState, useEffect } from "react";
// import supabase from "../../config/superbaseClient";
// import Header from "../../../reusables/Header/Header";
// import Slidebar from "../../../reusables/Sidebar/Sidebar";
// import Adminfooter from "../../../reusables/Adminfooter/Adminfooter";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Grid,
//   Typography,
//   Paper,
//   CircularProgress,
//   Pagination,
// } from "@mui/material";

// const UserOrderList = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1); //total used page for pagination
//   const [rowsPerPage, setRowsPerPage] = useState(6);//orders per page 
//   const [totalOrders, setTotalOrders] = useState(0);//total order's number 

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       const { data, error, count } = await supabase
//         .from("orders")
//         .select(
//           "user_id, product_id, quantity, total_price, created_at, product_image, product_price, customer_name, product_name, product_description, status",
//           { count: "exact" }
//         )
//         .range((page - 1) * rowsPerPage, page * rowsPerPage - 1); // Paginate

//       if (error) {
//         console.error("Error fetching orders:", error);
//       } else {
//         setOrders(data || []);
//         setTotalOrders(count || 0); // Set total orders for pagination
//       }
//       setLoading(false);
//     };

//     fetchOrders();
//   }, [page, rowsPerPage]); // Re-fetch when page or rowsPerPage changes

//   const handleStatusChange = async (userId, productId, orderTime, currentStatus) => {
//     const newStatus = currentStatus === "Pending" ? "Delivered" : "Pending";

//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.user_id === userId && order.product_id === productId && order.created_at === orderTime
//           ? { ...order, status: newStatus }
//           : order
//       )
//     );

//     const { error } = await supabase
//       .from("orders")
//       .update({ status: newStatus })
//       .eq("user_id", userId)
//       .eq("product_id", productId)
//       .eq("created_at", orderTime);

//     if (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage); 
//   };

//   console.log("total pagination order is",totalOrders);
//   console.log("per page order",rowsPerPage);
//   console.log("total page",page);

//   return (
//     <Box>
//       <Header />
//       <Box sx={{ display: "flex", marginLeft: "200px", flexDirection: "column", marginBottom: "100px" }}>
//         <Slidebar />
//         <Box
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             backgroundColor: "#f9f9f9",
//             minHeight: "100vh",
//             display: "flex",
//             justifyContent: "flex-start",
//             flexDirection: "column",
//           }}
//         >
//           <Typography variant="h4" component="h2" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
//             User Orders
//           </Typography>

//           {loading ? (
//             <CircularProgress sx={{ margin: "auto", display: "block" }} />
//           ) : (
//             <Grid container spacing={3}>
//               {orders.length > 0 ? (
//                 orders.map((order, index) => (
//                   <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//                     <Card
//                       sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         boxShadow: 3,
//                         borderRadius: 2,
//                         backgroundColor: "#fff",
//                         padding: 2,
//                       }}
//                     >
//                       <CardMedia
//                         component="img"
//                         height="140"
//                         image={order.product_image}
//                         alt={order.product_name}
//                         sx={{
//                           objectFit: "cover",
//                           borderRadius: 2,
//                         }}
//                       />
//                       <CardContent sx={{ flexGrow: 1 }}>
//                         <Typography variant="h6" component="div">
//                           {order.product_name}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
//                           {order.product_description}
//                         </Typography>
//                         <Typography variant="body1" sx={{ marginBottom: 1 }}>
//                           Quantity: {order.quantity}
//                         </Typography>
//                         <Typography variant="body1" sx={{ marginBottom: 1 }}>
//                           Total Price: ${order.total_price}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
//                           Customer: {order.customer_name}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
//                           Ordered on: {new Date(order.created_at).toLocaleDateString()}
//                         </Typography>

//                         <Button
//                           onClick={() =>
//                             handleStatusChange(order.user_id, order.product_id, order.created_at, order.status)
//                           }
//                           sx={{
//                             backgroundColor: order.status === "Pending" ? "orange" : "green",
//                             color: "white",
//                             ":hover": {
//                               backgroundColor: order.status === "Pending" ? "darkorange" : "darkgreen",
//                             },
//                           }}
//                           variant="contained"
//                         >
//                           {order.status}
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))
//               ) : (
//                 <Grid item xs={12}>
//                   <Paper sx={{ padding: 3, textAlign: "center" }}>
//                     <Typography variant="h6">No orders available.</Typography>
//                   </Paper>
//                 </Grid>
//               )}
//             </Grid>
//           )}

//           {/* Pagination */}
//           <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
//             <Pagination
//             count={Math.ceil(totalOrders / rowsPerPage)}
//             page={page}
//             onChange={handlePageChange}
//             color="primary"
//             />

//           </Box>
//         </Box>
//       </Box>
//       <Adminfooter />
//     </Box>
//   );
// };

// export default UserOrderList;


"use client";
import { useState, useEffect } from "react";
import supabase from "../../config/superbaseClient";
import Header from "../../../reusables/Header/Header";
import Slidebar from "../../../reusables/Sidebar/Sidebar";
import Adminfooter from "../../../reusables/Adminfooter/Adminfooter";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Pagination,
} from "@mui/material";

const UserOrderList = () => {
  const [orders, setOrders] = useState([]); // All orders from the database
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page number
  const [rowsPerPage] = useState(6); // Orders per page

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select(
          "user_id, product_id, quantity, total_price,created_at,product_image,product_price,customer_name,product_name, product_description, status"
        );

      if (error) 
      {
        console.error("Error fetching orders:", error);
      } 
      else 
      {
        setOrders(data || []);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  // Get paginated orders based on current page
  const paginatedOrders = orders.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  console.log("total pagination orders",paginatedOrders);

  const handleStatusChange = async (userId, productId, orderTime, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Delivered" : "Pending";

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.user_id === userId && order.product_id === productId && order.created_at === orderTime
          ? { ...order, status: newStatus }
          : order
      )
    );

    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("user_id", userId)
      .eq("product_id", productId)
      .eq("created_at", orderTime);

    if (error) {
      console.error("Error updating status:", error);
    }
  };

  const handlePageChange = (event,newPage) => {
    setPage(newPage);
  };

  // Calculate total pages
  const totalPages = Math.ceil(orders.length / rowsPerPage);

  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex", marginLeft: "200px", flexDirection: "column", marginBottom: "100px" }}>
        <Slidebar />
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#f9f9f9",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" component="h2" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
            User Orders
          </Typography>

          {loading ? (
            <CircularProgress sx={{ margin: "auto", display: "block" }} />
          ) : (
            <Grid container spacing={3}>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: 3,
                        borderRadius: 2,
                        backgroundColor: "#fff",
                        padding: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={order.product_image}
                        alt={order.product_name}
                        sx={{
                          objectFit: "cover",
                          borderRadius: 2,
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div">
                          {order.product_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                          {order.product_description}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                          Quantity: {order.quantity}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                          Total Price: ${order.total_price}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                          Customer: {order.customer_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                          Ordered on: {new Date(order.created_at).toLocaleDateString()}
                        </Typography>

                        <Button
                          onClick={() =>
                            handleStatusChange(order.user_id, order.product_id, order.created_at, order.status)
                          }
                          sx={{
                            backgroundColor: order.status === "Pending" ? "orange" : "green",
                            color: "white",
                            ":hover": {
                              backgroundColor: order.status === "Pending" ? "darkorange" : "darkgreen",
                            },
                          }}
                          variant="contained"
                        >
                          {order.status}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Paper sx={{ padding: 3, textAlign: "center" }}>
                    <Typography variant="h6">No orders available.</Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          )}

          
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Pagination
              count={totalPages}
              //page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
      <Adminfooter />
    </Box>
  );
};

export default UserOrderList;
