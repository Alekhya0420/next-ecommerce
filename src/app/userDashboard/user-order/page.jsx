// import React from 'react'
// import Userordered from '../../../components/Userpanel/Userordered/Userordered'

// const page = () => {
//   return (
//     <div>
//     <Userordered/>
//     </div>
//   )
// }

// export default page


import React, {Suspense,lazy} from 'react';
const Userordered = lazy(() => import('../../../components/Userpanel/Userordered/Userordered'));

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Userordered />
      </Suspense>
    </div>
  );
};

export default Page;
