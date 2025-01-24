// import React from 'react'
// import UserDashboard from '../../components/Userpanel/UserDashboard/UserDashboard'

// const page = () => {
//   return (
//     <div>
//     <UserDashboard/>
//     </div>
//   )
// }

// export default page

"use client"
import React from 'react';
import dynamic from 'next/dynamic';


const UserDashboard = dynamic(() => import('../../components/Userpanel/UserDashboard/UserDashboard'), {
  ssr: false, 
});

const Page = () => {
  return (
    <div>
      <UserDashboard />
    </div>
  );
};

export default Page;
