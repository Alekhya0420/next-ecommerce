// import React from 'react'
// import Review from '../../components/Review/Review'

// const page = () => {
//   return (
//     <div>
//         <Review/>
//     </div>
//   )
// }

// export default page

import React, { lazy, Suspense } from 'react';
const Review = lazy(() => import('../../components/Review/Review'));

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Review />
      </Suspense>
    </div>
  );
};

export default Page;
