// import React, { useState, useEffect } from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import supabase from '../../src/config/superbaseClient';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const Countrychart = ({ setUserCount }) => {  
//   const [countryData, setCountryData] = useState({});

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const { data, error } = await supabase
//           .from('users')
//           .select('country'); 

//         if (error) throw error;

//         // Counting occurrences of each country
//         const countryCounts = data.reduce((acc, user) => {
//           acc[user.country] = (acc[user.country] || 0) + 1;
//           return acc;
//         }, {});

//         setCountryData(countryCounts);
//         setUserCount(data.length);  
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     }

//     fetchData();
//   }, [setUserCount]);

//   const chartData = {
//     labels: Object.keys(countryData), 
//     datasets: [
//       {
//         data: Object.values(countryData), 
//         backgroundColor: Object.keys(countryData).map(
//           () => "#" + Math.floor(Math.random() * 16777215).toString(16)
//         ), 
//         hoverBackgroundColor: Object.keys(countryData).map(
//           () => "#" + Math.floor(Math.random() * 16777215).toString(16)
//         ), 
//       },
//     ],
//   };

//   return (
//     <div>
//       <Pie data={chartData} />
//     </div>
//   );
// };

// export default Countrychart;


import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, Tooltip, Legend } from 'chart.js';
import supabase from '../../src/config/superbaseClient';

ChartJS.register(BarElement, CategoryScale, Tooltip, Legend);

const Countrychart = ({ setUserCount }) => {  
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('country'); 

        if (error) throw error;

        // Counting occurrences of each country
        const countryCounts = data.reduce((acc, user) => {
          acc[user.country] = (acc[user.country] || 0) + 1;
          return acc;
        }, {});

        setCountryData(countryCounts);
        setUserCount(data.length);  
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, [setUserCount]);

  const chartData = {
    labels: Object.keys(countryData), // Country names
    datasets: [
      {
        label: 'Number of Users',
        data: Object.values(countryData), // Counts of users per country
        backgroundColor: Object.keys(countryData).map(
          () => "#" + Math.floor(Math.random() * 16777215).toString(16)
        ),
        borderColor: "#000", // Optional, for a border around the bars
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Countries',
        },
      },
      y: {
        title: {
          display: true,
          text: 'User Count',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Countrychart;
