// import React from 'react'
// import { Link } from 'react-router-dom'
// import { Button } from '@/components/ui/button'
// import CourseTab from './CourseTab'
// const EditCourse = () => {
//   return (
//     <div className='flex-1  mt-10'>
//         <div className='flex items-center justify-between mb-5'>
//             <h1 className='font-bold text-xl'>Add details information regarding course </h1>
//             <Link to="lecture">
//                 <Button className="hover:to-blue-800">Go to lectures Page </Button>
//             </Link>
//         </div>
//         <CourseTab/>
//     </div>
//   )
// }

// export default EditCourse


import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CourseTab from './CourseTab';

const EditCourse = () => {
  return (
    <div className="flex-1 mt-10">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">Add details information regarding course</h1>
        <Link to="lecture">
          <Button className="hover:bg-blue-800">Go to lectures Page</Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default memo(EditCourse);
