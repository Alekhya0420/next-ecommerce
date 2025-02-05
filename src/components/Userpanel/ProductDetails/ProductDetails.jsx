'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import supabase from '../../../config/superbaseClient';
import UserHeader from '../../../../reusables/users/UserHeader/UserHeader';
import UserFooter from '../../../../reusables/users/UserFooter/UserFooter';
import UserSlidebar from '../../../../reusables/users/UserSlidebar/UserSlidebar';
import { Container, Grid, Card, CardContent, CardMedia, Typography, CircularProgress, Box, Divider, Button, Rating } from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();  
  const [product, setProduct] = useState(null); 
  const [reviews, setReviews] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);  

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);  
      fetchProductReviews(id);   
    }
  }, [id]);  

  const fetchProductDetails = async (productId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      setError('Error fetching product details');
      console.error('Error fetching product details:', error);
    } else {
      setProduct(data); 
    }
    setLoading(false);
  };

  const fetchProductReviews = async (productId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId);

    if (error) {
      setError('Error fetching product reviews');
      console.error('Error fetching product reviews:', error);
    } else {
      setReviews(data); 
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', paddingTop: 5 }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div 
    style={{display:'flex',flexDirection:'column',minHeight:'100vh',backgroundColor:"#f5f5f5",marginTop:"50px"}}>
      <UserHeader />  
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5, flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <UserSlidebar />  
          </Grid>
          <Grid item xs={12} md={9}>
            <Card sx={{ boxShadow: 5, borderRadius: 3, height: "75vh", overflowY: "auto", p: 4, background: "#fff" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                  <CardMedia
                    component="img"
                    image={product.image_url}
                    title={product.name}
                    sx={{ width: '100%', borderRadius: 2, height: 300, objectFit: 'contain' }}
                  />
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography variant="h4" color="primary" gutterBottom>{product.name}</Typography>
                  <Typography variant="h6" color="textSecondary" gutterBottom>{product.description}</Typography>
                  <Typography variant="h5" color="secondary" sx={{ mt: 2 }}>Price: ${product.price}</Typography>
                  <Button 
                  variant="contained" 
                  href='/userDashboard'
                  color="success" 
                  sx={{ mt: 3, width: '100%' }}>
                  Back to Dashboard
                  </Button>

                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h5" gutterBottom>Customer Reviews</Typography>
              {reviews.length > 0 ? (
                <Grid container spacing={3}>
                  {reviews.map((review) => (
                    <Grid item xs={12} md={6} key={review.id}>
                      <Card sx={{ p: 2, backgroundColor: '#fafafa', boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="subtitle1" color="primary">{review.user_id}</Typography>
                        <Rating value={review.rating || 4} readOnly sx={{ my: 1 }} />
                        <Typography variant="body1" color="textSecondary">{review.review}</Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" color="textSecondary">No reviews yet.</Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
      <UserFooter />
    </div>
  );
};

export default ProductDetails;
