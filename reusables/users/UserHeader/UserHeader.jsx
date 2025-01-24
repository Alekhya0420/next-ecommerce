"use client"
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { Menu as MenuIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import Link from 'next/link';
import supabase from '../../../src/config/superbaseClient'

const UserHeader = () => {
  const [cartNo, setcartNo] = useState(0);

  
  const user = localStorage.getItem("user");
  const cust_id = user ? JSON.parse(user).id : null; 
  
  if (!cust_id) {
    console.log("No user found in localStorage");
  }

  useEffect(() => {
    if (cust_id) {
      const CartNumber = async () => {
        const { data, error, count } = await supabase
          .from('orders')
          .select('quantity', { count: 'exact' })
          .eq('user_id', cust_id);

        if (error) {
          console.log("There is an issue in it");
        } else {
          const totalQuantity = data.reduce((acc, item) => acc + item.quantity, 0);
          setcartNo(totalQuantity);
        }
      };
      CartNumber();
    }
  }, [cust_id]); // Make sure cust_id is available before executing the effect

  console.log("quantity is", cartNo);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#e0e0e0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ display: 'flex', gap: '20px' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ ml: 1 }}>
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: '200',
            color: '#333',
          }}
        >
          User-Dashboard
        </Typography>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/userDashboard/user-order">
            <Typography
              variant="h6"
              sx={{
                fontWeight: '200',
                color: '#333',
                '&:hover': {
                  color: '#e91e63', // Change to your desired hover color
                }
              }}
            >
              Orders
            </Typography>
          </Link>

          <Typography
            variant="h6"
            sx={{
              fontWeight: '200',
              color: '#333',
              '&:hover': {
                color: '#e91e63',
              }
            }}
          >
            Cart({cartNo})
          </Typography>
        </div>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#e91e63', // Pink background for the button
            color: '#fff', // White text
            borderRadius: '50%', // Circular button design
            padding: '8px 16px', // Padding for better size
          }}
        >
          <AccountCircleIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
