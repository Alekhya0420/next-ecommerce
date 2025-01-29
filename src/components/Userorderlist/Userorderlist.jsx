

"use client"
import { useState, useEffect } from "react";
import supabase from "../../config/superbaseClient";
import Header from "../../../reusables/Header/Header";
import Slidebar from "../../../reusables/Sidebar/Sidebar";
import Adminfooter from "../../../reusables/Adminfooter/Adminfooter";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

const UserOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          "user_id, product_id, quantity, total_price, created_at, product_image, product_price, customer_name, product_name, product_description, status"
        );

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data || []);
      }
    };

    fetchOrders();
  }, []);

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

  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex", marginLeft: "200px", marginTop: "10px" }}>
        <Slidebar />
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#F1F8FF",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center", 
            alignItems: "center", 
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 3,
              maxHeight: "70vh",
              overflowX: "auto",
              width: "80%", // Table width adjusted
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {[
                    "u_id",
                    "Product Name",
                    "Description",
                    "Quantity",
                    "Product Price",
                    "Total Price",
                    "Product Image",
                    "Customer Name",
                    "Created At",
                    "Status",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        backgroundColor: "#007BFF",
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "8px",
                        maxWidth: "150px",
                        wordWrap: "break-word",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <TableRow key={index} hover>
                      <TableCell align="center">{order.user_id}</TableCell>
                      <TableCell align="center">{order.product_name}</TableCell>
                      <TableCell align="center">{order.product_description}</TableCell>
                      <TableCell align="center">{order.quantity}</TableCell>
                      <TableCell align="center">${order.product_price}</TableCell>
                      <TableCell align="center">${order.total_price}</TableCell>
                      <TableCell align="center">
                        <img
                          src={order.product_image}
                          alt={order.product_name}
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">{order.customer_name}</TableCell>
                      <TableCell align="center">
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center">
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
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No orders available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Adminfooter />
    </Box>
  );
};

export default UserOrderList;
