// "use client";
// import React, { useState, useEffect } from "react";
// import Slidebar from "../../../reusables/Sidebar/Sidebar";
// import Header from "../../../reusables/Header/Header";
// import { Grid, Card, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
// import Link from "next/link";
// import supabase from "../../config/superbaseClient";
// import ProductQuantity from "../../../reusables/ProductQuantity/ProductQuantity";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import Countrychart from "../../../reusables/Piechart/Countrychart";
// import Adminfooter from "../../../reusables/Adminfooter/Adminfooter";
// import Orderlength from "../../../reusables/Orderlength/Orderlength";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const Admin = () => {
//   const [userCount, setUserCount] = useState(0);
//   const { productLength } = ProductQuantity();
//   const { orderLength } = Orderlength();
//   const [totalSale, setTotalSale] = useState(0);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchTotalPrice = async () => {
//       try {
//         const { data, error } = await supabase.from("orders").select("total_price");
//         if (error) throw error;
//         const total = data.reduce((sum, order) => sum + order.total_price, 0);
//         setTotalSale(total);
//       } catch (err) {
//         console.error("Error fetching total price:", err);
//       }
//     };
//     fetchTotalPrice();
//   }, []);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const { data, error } = await supabase.from("orders").select("*");
//         if (error) throw error;
//         setOrders(data);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       }
//     };
//     fetchOrders();
//   }, []);

//   return (
//     <div style={{display:"flex",height:"100vh",backgroundColor:"#F9F9F9",marginBottom:"100px"}}>
//       <Slidebar />
//       <div style={{ flexGrow: 1, padding: "20px", marginLeft: "260px", overflowY: "auto" }}>
//         <Header />
//         <Grid container spacing={4} sx={{mt:4}}>
//           {[{ title: "No. of Users", count: userCount, color: "#42A5F5" },
//             { title: "No. of Orders", count: orderLength, color: "#66BB6A" },
//             { title: "No. of Products", count: productLength, color: "#FFA726" }].map((stat, index) => (
//             <Grid item xs={12} sm={4} key={index}>
//               <Card sx={{ padding: 3, backgroundColor: stat.color, color: "#fff", textAlign: "center", boxShadow: 5, borderRadius: 2 }}>
//                 <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>{stat.title}</Typography>
//                 <Typography variant="h3" sx={{ fontWeight: "bold" }}>{stat.count}</Typography>
//               </Card>
//             </Grid>
//           ))}

//           {/* Additional Features */}
//           <Grid item xs={12} sm={4}>
//             <Card sx={{ padding: 3, backgroundColor: "#EF5350", color: "#fff", textAlign: "center", boxShadow: 5, borderRadius: 2 }}>
//               <Typography variant="h6" sx={{ fontWeight: "bold" }}>Total Sale</Typography>
//               <Typography variant="h3" sx={{ fontWeight: "bold" }}>${totalSale}</Typography>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Card sx={{ padding: 3, backgroundColor: "#AB47BC", color: "#fff", textAlign: "center", boxShadow: 5, borderRadius: 2 }}>
//               <Typography variant="h6" sx={{ fontWeight: "bold" }}>Add Product</Typography>
//               <Link href="/add">
//                 <Button variant="contained" sx={{ mt: 2, backgroundColor: "#fff", color: "#AB47BC", borderRadius: "20px", padding: "10px 25px", textTransform: "none" }}>
//                   Add New Product
//                 </Button>
//               </Link>
//             </Card>
//           </Grid>

//           {/* Pie Charts */}
//           <Grid item xs={12} sm={6}>
//             <Card sx={{ padding: 3, boxShadow: 5, textAlign: "center", backgroundColor: "#ECEFF1", borderRadius: 2 }}>
//               <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem", mb: 2 }}>Country Visit</Typography>
//               <Countrychart setUserCount={setUserCount} />
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Card sx={{ padding: 3, boxShadow: 5, textAlign: "center", backgroundColor: "#ECEFF1", borderRadius: 2 }}>
//               <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem", mb: 2 }}>Sales Breakdown</Typography>
//               <Pie
//                 data={{
//                   labels: ["Low", "Medium", "High"],
//                   datasets: [{
//                     data: [30, 50, 20],
//                     backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"]
//                   }]
//                 }}
//                 options={{
//                   responsive: true,
//                   plugins: {
//                     tooltip: {
//                       backgroundColor: "#333",
//                       titleColor: "#fff",
//                       bodyColor: "#fff",
//                       padding: 10,
//                     }
//                   }
//                 }}
//               />
//             </Card>
//           </Grid>

//           {/* Orders Table */}
//           <Grid item xs={12}>
//             <Card sx={{ padding: 3, boxShadow: 5, backgroundColor: "#F5F5F5", borderRadius: 2 }}>
//               <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", fontSize: "1.1rem" }}>Order History</Typography>
//               <TableContainer component={Paper} sx={{maxHeight:300,overflowY:"auto"}}>
//                 <Table stickyHeader>
//                   <TableHead sx={{backgroundColor:"#E0E0E0"}}>
//                   <TableRow>
//                   <TableCell sx={{fontWeight:"bold"}}>Order ID</TableCell>
//                   <TableCell sx={{fontWeight:"bold"}}>Customer</TableCell>
//                   <TableCell sx={{fontWeight:"bold"}}>Amount</TableCell>
//                   <TableCell sx={{fontWeight:"bold"}}>Status</TableCell>
//                   <TableCell sx={{fontWeight:"bold"}}>Product Image</TableCell>
//                   </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {orders.map((order, index) => (
//                       <TableRow key={index}>
//                         <TableCell>{order.id}</TableCell>
//                         <TableCell>{order.customer_name}</TableCell>
//                         <TableCell>${order.total_price}</TableCell>
//                         <TableCell>{order.status}</TableCell>
//                         <TableCell>
//                           <img
//                             src={order.product_image} // Assuming 'product_image_url' holds the product image URL
//                             alt="Product"
//                             style={{ width: "50px", height: "50px", objectFit: "cover" }}
//                           />
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Card>
//           </Grid>
//         </Grid>
//         <Adminfooter />
//       </div>
//     </div>
//   );
// };

// export default Admin;



"use client";
import React, { useState, useEffect } from "react";
import Slidebar from "../../../reusables/Sidebar/Sidebar";
import Header from "../../../reusables/Header/Header";
import { Grid, Card, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Link from "next/link";
import supabase from "../../config/superbaseClient";
import ProductQuantity from "../../../reusables/ProductQuantity/ProductQuantity";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import Countrychart from "../../../reusables/Piechart/Countrychart";
import Adminfooter from "../../../reusables/Adminfooter/Adminfooter";
import Orderlength from "../../../reusables/Orderlength/Orderlength";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Admin = () => {
  const [userCount, setUserCount] = useState(0);
  const {productLength} = ProductQuantity();
  const {orderLength} = Orderlength();
  const [totalSale,setTotalSale] = useState(0);
  const [orders,setOrders] = useState([]);
  const [productPrices,setProductPrices]=useState([]);

  useEffect(() => {
    const fetchTotalPrice = async () => {
      try {
        const { data, error } = await supabase.from("orders").select("total_price");
        if (error) throw error;
        const total = data.reduce((sum, order) => sum + order.total_price, 0);
        setTotalSale(total);
      } catch (err) {
        console.error("Error fetching total price:", err);
      }
    };
    fetchTotalPrice();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase.from("orders").select("*");
        if (error) throw error;
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchProductPrices = async () => {
      try {
        const { data, error } = await supabase.from("products").select("price");
        if (error) throw error;
        setProductPrices(data);
      } catch (err) {
        console.error("Error fetching product prices:", err);
      }
    };
    fetchProductPrices();
  }, []);

  // Categorizing product prices into three categories
  const priceCategories = {
    lessThan1000: 0,
    between1000And2000: 0,
    between2000And5000: 0,
    moreThan5000: 0
  };

  productPrices.forEach(product => {
    if (product.price < 1000) priceCategories.lessThan1000 += 1;
    else if (product.price >= 1000 && product.price <= 2000) priceCategories.between1000And2000 += 1;
    else if (product.price > 2000 && product.price <= 5000) priceCategories.between2000And5000 += 1;
    else priceCategories.moreThan5000 += 1;
  });

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#F9F9F9", marginBottom: "100px" }}>
      <Slidebar />
      <div style={{ flexGrow: 1, padding: "20px", marginLeft: "260px", overflowY: "auto" }}>
        <Header />
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Stats Cards */}
          {[{ title: "No. of Users", count: userCount, color: "#42A5F5" },
            { title: "No. of Orders", count: orderLength, color: "#66BB6A" },
            { title: "No. of Products", count: productLength, color: "#FFA726" }].map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ padding: 3, backgroundColor: stat.color, color: "#fff", textAlign: "center", boxShadow: 5, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>{stat.title}</Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>{stat.count}</Typography>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12} sm={4}>
            <Card sx={{ padding: 3, backgroundColor: "#EF5350", color: "#fff", textAlign: "center", boxShadow: 5, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Total Sale</Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>${totalSale}</Typography>
            </Card>
          </Grid>

          {/* Add Product Button */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ padding: 3, backgroundColor: "#AB47BC", color: "#fff", textAlign: "center", boxShadow: 5, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Add Product</Typography>
              <Link href="/add">
                <Button variant="contained" sx={{ mt: 2, backgroundColor: "#fff", color: "#AB47BC", borderRadius: "20px", padding: "10px 25px", textTransform: "none" }}>
                  Add New Product
                </Button>
              </Link>
            </Card>
          </Grid>

          {/* Orders Statistics Bar Chart */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ padding: 3, boxShadow: 5, textAlign: "center", backgroundColor: "#ECEFF1", borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem", mb: 2 }}>Order Statistics</Typography>
              <Bar
                data={{
                  labels: orders.map(order => order.customer_name),
                  datasets: [{
                    label: "Total Price ($)",
                    data: orders.map(order => order.total_price),
                    backgroundColor: "#42A5F5"
                  }]
                }}
                options={{ responsive: true }}
              />
            </Card>
          </Grid>

          {/* Country-wise Bar Chart */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ padding: 3, boxShadow: 5, textAlign: "center", backgroundColor: "#ECEFF1", borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem", mb: 2 }}>Orders by Country</Typography>
              <Countrychart setUserCount={setUserCount} />
            </Card>
          </Grid>

          {/* Product Price Bar Chart */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ padding: 3, boxShadow: 5, textAlign: "center", backgroundColor: "#ECEFF1", borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem", mb: 2 }}>Product Price Categories</Typography>
              <Bar
                data={{
                  labels: ["<1000", "1000-2000", "2000-5000", ">5000"],
                  datasets: [{
                    label: "Number of Products",
                    data: [
                      priceCategories.lessThan1000,
                      priceCategories.between1000And2000,
                      priceCategories.between2000And5000,
                      priceCategories.moreThan5000
                    ],
                    backgroundColor: "#FFA726"
                  }]
                }}
                options={{ responsive: true }}
              />
            </Card>
          </Grid>

          {/* Orders Table */}
          <Grid item xs={12}>
            <Card sx={{ padding: 3, boxShadow: 5, backgroundColor: "#F5F5F5", borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", fontSize: "1.1rem" }}>Order History</Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: "auto" }}>
                <Table stickyHeader>
                  <TableHead sx={{ backgroundColor: "#E0E0E0" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Customer</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Product Image</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.customer_name}</TableCell>
                        <TableCell>${order.total_price}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell><img src={order.product_image} alt={order.product_name} width={50} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>

        {/* Admin Footer */}
        <Adminfooter />
      </div>
    </div>
  );
};

export default Admin;
