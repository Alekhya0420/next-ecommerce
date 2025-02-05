// import React from 'react'
// import Userorderlist from  '../../components/Userorderlist/Userorderlist'


// const page = () => {
//   return (
//     <div>
//     <Userorderlist/>
//     </div>
//   )
// }
// export default page


import React, { lazy, Suspense } from 'react';
const Userorderlist = lazy(() => import('../../components/Userorderlist/Userorderlist'));

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Userorderlist />
      </Suspense>
    </div>
  );
};

export default Page;