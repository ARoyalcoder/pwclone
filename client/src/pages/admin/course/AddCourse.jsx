// import React, { useEffect, useState } from 'react';
// import { Label } from '@radix-ui/react-dropdown-menu';
// import { SelectDemo } from '@/components/ui/Select1';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';
// import { Loader2 } from 'lucide-react';
// import { useCreateCourseMutation } from '@/features/api/courseApi.js';
// import { toast } from 'sonner';






// const AddCourse = () => {

//   const [courseTitle, setCourseTitle] = useState("");
//   const [category, setCategory] = useState("");

//   const [createCourse, { data, isLoading, error, isSuccess }] =
//     useCreateCourseMutation();
//   const navigate = useNavigate();

//   const createCourseHandler = async () => {
//     await createCourse({ courseTitle, category });
//   }

//   const getSelectedCategory = (value) => {
//     setCategory(value);
//   }

//   // for displaying toast 
//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data?.message || "Course created.");
//       navigate("/admin/course");
//     }
//   }, [isSuccess, error]);

//   return (
//     <div className="flex-1 max-w-3xl mx-auto mt-20 p-8 bg-white shadow-lg rounded-2xl">
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold text-gray-800">
//           Let's add a course
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Add some basic details for your new course.
//         </p>
//       </div>

//       <div className="space-y-6">
//         <div>
//           <Label className="block text-sm font-medium text-gray-700 mb-2">
//             Course Title
//           </Label>
//           <input
//             type="text"
//             name="CourseTitle"
//             placeholder="Your Course Name"
//             onChange={(e) => setCourseTitle(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <Label className="block text-sm font-medium text-gray-700 mb-2">
//             Category
//           </Label>

//           {/* call the SelectDemo  */}

//           <SelectDemo getSelectedCategory={getSelectedCategory} />
//         </div>
//         <div className='flex items-center gap-3'>
//           <Button variant="outline" onClick={() => navigate("/admin/course")}>Back</Button>
//           <Button disabled={isLoading} onClick={createCourseHandler}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Creating...
//               </>
//             ) : (
//               "Create"
//             )}
//           </Button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCourse;



import React, { useEffect, useState } from 'react';
import { Label } from '@radix-ui/react-dropdown-menu';
import { SelectDemo } from '@/components/ui/Select1';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useCreateCourseMutation } from '@/features/api/courseApi.js';
import { toast } from 'sonner';

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, isSuccess, isError, error }] = useCreateCourseMutation();
  const navigate = useNavigate();

  const createCourseHandler = async () => {
    try {
      await createCourse({ courseTitle, category }).unwrap(); 
    } catch (err) {
      // Error is already handled by toast in useEffect
    }
  };

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created.");
      navigate("/admin/course");
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create course.");
    }
  }, [isSuccess, isError, data, error, navigate]);

  return (
    <div className="flex-1 max-w-3xl mx-auto mt-20 ml-0 mr-0 p-8 bg-white shadow-lg rounded-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Let's add a course</h1>
        <p className="text-gray-500 mt-1">Add some basic details for your new course.</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Course Title
          </Label>
          <input
            type="text"
            name="CourseTitle"
            placeholder="Your Course Name"
            onChange={(e) => setCourseTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </Label>
          <SelectDemo getSelectedCategory={getSelectedCategory} />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
