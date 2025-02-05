// import React from 'react'
// import Userlogin from '../../components/Userpanel/Userlogin/Userlogin'


// const page = () => {
//   return (
//     <div>
//     <Userlogin/>
//     </div>
//   )
// }

// export default page


import React, { lazy, Suspense } from 'react';
const Userlogin = lazy(() => import('../../components/Userpanel/Userlogin/Userlogin'));

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Userlogin />
      </Suspense>
    </div>
  );
};
export default Page;
