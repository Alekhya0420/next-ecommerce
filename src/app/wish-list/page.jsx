// import React from 'react'
// import Wishlist from '../../components/Wishlist/Wishlist'

// const page = () => {
//   return (
//     <div>
//     <Wishlist/>
//     </div>
//   )
// }

// export default page

import React, {Suspense,lazy} from 'react';
const Wishlist = lazy(() => import('../../components/Wishlist/Wishlist'));

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Wishlist />
      </Suspense>
    </div>
  );
};

export default Page;
