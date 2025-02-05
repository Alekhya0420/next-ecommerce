//import React from 'react'
//import ProductDetails from '../../../../components/Userpanel/ProductDetails/ProductDetails'

//const page = () => {
//   return (
//     <div>
//     <ProductDetails/>
//     </div>
//  )
//}

//export default page

import React, { Suspense, lazy } from 'react';
const ProductDetails = lazy(() => import('../../../../components/Userpanel/ProductDetails/ProductDetails'));

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetails />
      </Suspense>
    </div>
  );
};

export default Page;
