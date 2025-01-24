'use client';
import React, { useEffect, useState } from 'react';
import Slidebar from '../../../reusables/Sidebar/Sidebar';
import Header from '../../../reusables/Header/Header';
import supabase from '../../config/superbaseClient'
import { useParams } from 'next/navigation';
import Adminfooter from '../../../reusables/Adminfooter/Adminfooter';

const Userinvolve = () => {
  const { name } = useParams();
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const decodedName = decodeURIComponent(name);

    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from('user_data_summary')
          .select('*')
          .ilike('user_name', `${decodedName}%`);

        if (error) {
          setError(`Error fetching data: ${error.message}`);
          console.error("Error fetching data:", error);
        } else {
          setUserData(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(`Error: ${error.message}`);
          console.error("Error:", error);
        }
      }
    };

    if (name) {
      fetchUserData();
    }

  }, [name]);

  return (
    <div style={{ height: "100vh", display: "flex", marginLeft: "200px" }}>
      <Header />
      <Slidebar />

      <div style={{ width: "100%", marginTop: "80px", padding: "20px" }}>
        <h2 style={{ textAlign: "center", color: "#0D47A1" }}>
          User Data for {decodeURIComponent(name)}
        </h2>

        {error && (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        )}

        {userData.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
            {userData.map((item, index) => (
              <div
                key={index}
                style={{
                  width: "300px",
                  border: "2px solid #0D47A1",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  backgroundColor: "#f4f4f9",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}
              >
                <img
                  src={item.product_image}
                  alt={item.user_order}
                  style={{ width: "100%", height: "140px", objectFit: "cover" }}
                />
                <div style={{ padding: "20px" }}>
                  <h4 style={{ color: "#0D47A1", marginBottom: "10px" }}>{item.user_name}</h4>
                  <p><strong>Order:</strong> {item.user_order}</p>
                  <p><strong>Price:</strong> ${item.product_price}</p>
                  <p><strong>Total Price:</strong> ${item.total_price}</p>
                  <p><strong>Review:</strong> {item.review}</p>
                  <p><strong>Description:</strong> {item.product_description}</p>
                  <p><strong>Country:</strong> {item.user_country}</p>
                  <p><strong>Email:</strong> {item.user_email}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>No data available</p>
        )}
      </div>

      <Adminfooter />
    </div>
  );
};

export default Userinvolve;
