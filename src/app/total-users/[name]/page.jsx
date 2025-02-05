// import React from 'react'
// import Userinvolve from '../../../components/Userinvolve/Userinvolve'

// const page = () => {
//   return (
//     <div>
//     <Userinvolve/>
//     </div>
//   )
// }

// export default page

import React, { lazy, Suspense } from 'react';
const Userinvolve = lazy(() => import('../../../components/Userinvolve/Userinvolve'));

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Userinvolve />
      </Suspense>
    </div>
  );
};

export default Page;
