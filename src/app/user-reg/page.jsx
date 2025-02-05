// import React from 'react'
// import UserRegistration from '../../components/Userpanel/Userregistration/UserRegistration'

// const page = () => {
//   return (
//     <div>
//     <UserRegistration/>
//     </div>
//   )
// }
//export default page


import React, { lazy, Suspense } from 'react';
const UserRegistration = lazy(() => import('../../components/Userpanel/Userregistration/UserRegistration'));

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserRegistration/>
      </Suspense>
    </div>
  );
};

export default Page;
