// import React from 'react'
// import UserDashboard from '../../components/Userpanel/UserDashboard/UserDashboard'

// const page = () => {
//   return (
//     <div>
//     <UserDashboard/>
//     </div>
//   )
// }
//export default page


import React, {Suspense,lazy} from 'react';
const UserDashboard = lazy(() => import('../../components/Userpanel/UserDashboard/UserDashboard'));

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserDashboard />
      </Suspense>
    </div>
  );
};

export default Page;
