'use client';
import React, { useState, useEffect } from 'react';
import Header from '../../../reusables/Header/Header';
import Slidebar from '../../../reusables/Sidebar/Sidebar';
import supabase from '../../config/superbaseClient';
import Adminfooter from '../../../reusables/Adminfooter/Adminfooter';
import Image from 'next/image';

const Productview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
          console.error('Error fetching products:', error.message);
        } else {
          const transformedProducts = (data || []).map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image_url: product.image_url || '',
          }));
          setProducts(transformedProducts);
        }
      } catch (err) {
        console.error('Unexpected error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete product handler
  const deleteProduct = async (productId) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) {
        console.error('Error deleting product:', error.message);
        return;
      }
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      alert('Product deleted successfully!');
    } catch (err) {
      console.error('Unexpected error deleting product:', err);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F1F8FF', marginBottom: '200px' }}>
      <Header />
      <Slidebar />
      <div
        style={{
          flexGrow: 1,
          padding: '20px',
          marginLeft: '240px',
          height: '100vh',
          marginTop: '60px',
          overflowY: 'auto',
        }}
      >
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Product List</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table
              className="table table-striped table-bordered table-hover"
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                borderRadius: '10px',
                backgroundColor: '#EAF6FF',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <thead
                className="thead-light"
                style={{ backgroundColor: '#A7D7F9', color: '#333' }}
              >
                <tr>
                  <th style={{ padding: '15px', border: '1px solid #D4EAFD' }}>ID</th>
                  <th style={{ padding: '15px', border: '1px solid #D4EAFD' }}>Name</th>
                  <th style={{ padding: '15px', border: '1px solid #D4EAFD' }}>Description</th>
                  <th style={{ padding: '15px', border: '1px solid #D4EAFD' }}>Price</th>
                  <th style={{ padding: '15px', border: '1px solid #D4EAFD' }}>Image</th>
                  <th style={{ padding: '15px', border: '1px solid #D4EAFD' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    style={{
                      backgroundColor: '#F7FCFF',
                      transition: 'background-color 0.3s ease',
                      border: '1px solid #D4EAFD',
                    }}
                  >
                    <td style={{ padding: '15px', border: '1px solid #D4EAFD' }}>{product.id}</td>
                    <td style={{ padding: '15px', border: '1px solid #D4EAFD' }}>{product.name}</td>
                    <td style={{ padding: '15px', border: '1px solid #D4EAFD' }}>{product.description}</td>
                    <td style={{ padding: '15px', border: '1px solid #D4EAFD' }}>${product.price.toFixed(2)}</td>
                    <td style={{ padding: '15px', border: '1px solid #D4EAFD' }}>
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={50}
                          height={50}
                          style={{
                            borderRadius: '5px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                      ) : (
                        'No image'
                      )}
                    </td>
                    <td style={{ padding: '15px', border: '1px solid #D4EAFD' }}>
                      <button
                        style={{
                          marginRight: '10px',
                          backgroundColor: '#E74C3C',
                          color: '#fff',
                          padding: '8px 15px',
                          borderRadius: '5px',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease',
                        }}
                        onClick={() => deleteProduct(product.id)}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#C0392B')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E74C3C')}
                      >
                        Delete
                      </button>
                      <button
                        style={{
                          backgroundColor: '#5DADE2',
                          color: '#fff',
                          padding: '8px 15px',
                          borderRadius: '5px',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3498DB')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#5DADE2')}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <Adminfooter />
    </div>
  );
};

export default Productview;
