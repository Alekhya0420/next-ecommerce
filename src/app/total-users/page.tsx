// import React from 'react'
// import Usercount from  '../../components/Usercount/Usercount'

// const page = () => {
//   return (
//     <div>
//     <Usercount/>
//     </div>
//   )
// }
// export default page


import React, { lazy, Suspense } from 'react';
const Usercount = lazy(() => import('../../components/Usercount/Usercount'));

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Usercount />
      </Suspense>
    </div>
  );
};

export default Page;
