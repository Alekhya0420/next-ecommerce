// import React from 'react'
// import Ordertracker from '../../components/Order-tracking/Ordertracker'


// const page = () => {
//   return (
//     <div>
//     <Ordertracker/>
//     </div>
//   )
// }
// export default page


import React, { lazy, Suspense } from 'react';
const Ordertracker = lazy(() => import('../../components/Order-tracking/Ordertracker'));

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Ordertracker />
      </Suspense>
    </div>
  );
};

export default Page;

