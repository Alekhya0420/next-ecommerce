// import React from 'react'
// import Admin from '../../components/Admin/Admin'

// const page = () => {
//   return (
//     <div>
//         <Admin/>
//     </div>
//   )
// }

// export default page

import React, { lazy, Suspense } from 'react';

const Admin = lazy(() => import('../../components/Admin/Admin'));

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Admin />
      </Suspense>
    </div>
  );
};

export default Page;
