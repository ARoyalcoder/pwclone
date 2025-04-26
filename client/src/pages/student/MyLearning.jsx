import React from 'react'
import Course from './Course';
import { useLoadUserQuery } from '@/features/api/authApi';





const MyLearning = () => {
    const {data , isLoading } = useLoadUserQuery();
    const MyLearning = data?.user.enrolledCourses || [];
    return (
        <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
            <h1 className="font-bold text-2xl">My Learning</h1>
            <div className="my-5">
                {isLoading ? <MyLearningSkeleton /> : MyLearning.length === 0 ? ("You are not enrolled in any course.") : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        {
                             MyLearning.map((course, index) => <Course key={index} course={course}/>)
                        }
                    </div>
                )}
            </div>
        </div>
    );
};



export default MyLearning;



// skeleton component for loading state 

const MyLearningSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
                />
            ))}
        </div>
    );
};
