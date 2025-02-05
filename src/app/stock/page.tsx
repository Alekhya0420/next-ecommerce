// import React from 'react'
// import Stockalert  from '../../components/Stockalert/Stockalert'

// const page = () => {
//   return (
//     <div>
//     <Stockalert/>
//     </div>
//   )
// }

// export default page

import React, { lazy, Suspense } from 'react';
const Stockalert = lazy(() => import('../../components/Stockalert/Stockalert'));

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Stockalert />
      </Suspense>
    </div>
  );
};

export default Page;
