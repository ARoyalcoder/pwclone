// import ByCourseButton from '@/components/ByCourseButton';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Separator } from '@radix-ui/react-dropdown-menu';
// import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi';
// import { BadgeInfo, Loader2, Lock, PlayCircle } from 'lucide-react';
// import React from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import ReactPlayer from 'react-player';




// const CourseDetail = () => {
//     const params = useParams();
//     const courseId = params.courseId;
//     const navigate = useNavigate();

//     const { data, isLoading, error, isError, isSuccess } = useGetCourseDetailWithStatusQuery(courseId);




//     if (isLoading) {
//         return <Loader2 className='w-4 h-4 animate-ping' />
//     }
//     if (isError) {
//         return <h1>Failed to load course details </h1>
//     }

//     const { course, purchased } = data;

//     // handling the continue courses 
//     const handleContinueCourse = ( ) => {
//         if(purchased){
//             navigate(`/course-progress/${courseId}`)
//         }
//     }   



//     return (
//         <div className='mt-20 space-y-5'>
//             <div className='bg-[#2D2F31] text-white '>
//                 <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-3 '>
//                     <h1 className='font-bold text-2xl '>{course?.courseTitle}</h1>
//                     <p className='text-base md:text-lg'>Course Sub-title</p>
//                     <p>
//                         Created By{""}
//                         <span className='text-[#C0C4FC] underline italic '>{course?.creator?.name}</span>
//                     </p>
//                     <div className='flex items-center gap-2 text-sm'>
//                         <BadgeInfo size={16} />
//                         <p>Last update {course.createdAt.split("T")[0]}</p>
//                     </div>
//                     <p>Student enrolled: {course?.enrolledStudent?.length} </p>
//                 </div>
//             </div>
//             <div className='max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between'>
//                 <div className='w-full lg:w-1/2 space-y-5'>
//                     <h1 className='font-bold text-xl md:text-3xl '>Description </h1>
//                     <p className='font-semibold' dangerouslySetInnerHTML={{ __html: course.description }} />
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Course Content</CardTitle>
//                             <CardDescription>4 Lectures</CardDescription>
//                         </CardHeader>
//                         <CardContent className="space-y-4 ">
//                             {
//                                 course.lectures.map((lecture, idx) => (
//                                     <div key={idx}>
//                                         <span>
//                                             {
//                                                 false ? (<PlayCircle size={14} />) : <Lock size={14} />
//                                             }
//                                         </span>
//                                         <p>{lecture.lectureTitle}</p>
//                                     </div>
//                                 ))
//                             }
//                         </CardContent>
//                     </Card>
//                 </div>
//                 <div className='w-full lg:w-1/3'>
//                     <Card>
//                         <CardContent className="p-4 flex flex-col">
//                             <div className='w-full aspect-video mb-4'>
//                                 <ReactPlayer
//                                     width={"100%"}
//                                     height={"100%"}
//                                     url={course.lectures[0].videoUrl}
//                                     controls={true}
//                                 />
                                 
//                             </div>
//                             <h1>Lecture Title </h1>
//                             <Separator />
//                             <h1 className='text-lg md:text-xl font-semibold'>Course Price </h1>
//                         </CardContent>
//                         <CardFooter className="flex justify-center p-4">
//                             {
//                                 purchased ?
//                                     <Button className="w-full" onClick={handleContinueCourse}>Continue Course</Button>
//                                     : <ByCourseButton courseId={courseId} />
//                             }
//                         </CardFooter>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CourseDetail; 
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator'; // updated import
import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi';
import { BadgeInfo, Loader2, Lock, PlayCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import ByCourseButton from '@/components/ByCourseButton';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetCourseDetailWithStatusQuery(courseId);

  // Memoized handler
  const handleContinueCourse = useCallback(() => {
    if (data?.purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  }, [data?.purchased, courseId, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1>Failed to load course details: {error?.message || "Unknown error"}</h1>
      </div>
    );
  }

  const { course, purchased } = data;

  return (
    <div className="mt-20 space-y-5 mt-0">
      {/* Top Section */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 space-y-3">
          <h1 className="font-bold text-2xl">{course?.courseTitle}</h1>
          <p className="text-base md:text-lg">{course?.courseSubtitle || "Course Sub-title"}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator?.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last update {course?.createdAt?.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudent?.length || 0}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row gap-8">
        {/* Left side */}
        <div className="w-full lg:w-2/3 space-y-5">
          <h1 className="font-bold text-xl md:text-3xl">Description</h1>
          <p
            className="font-semibold"
            dangerouslySetInnerHTML={{
              __html: course?.description || "No description available.",
            }}
          />

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course?.lectures?.length || 0} Lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {course?.lectures?.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {purchased ? <PlayCircle size={18} /> : <Lock size={18} />}
                  <p>{lecture?.lectureTitle || `Lecture ${idx + 1}`}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right side */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              {course?.lectures?.[0]?.videoUrl && (
                <div className="w-full aspect-video mb-4">
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={course.lectures[0].videoUrl}
                    controls
                  />
                </div>
              )}
              <h1>{course?.lectures?.[0]?.lectureTitle || "Lecture Title"}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button className="w-full" onClick={handleContinueCourse}>
                  Continue Course
                </Button>
              ) : (
                <ByCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
