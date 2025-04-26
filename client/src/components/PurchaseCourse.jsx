import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi';
import { Loader2 } from 'lucide-react';
import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

const PurchaseCourseProtected = ({ children }) => {
    const {courseId} = useParams();
    const { data, isLoading } = useGetCourseDetailWithStatusQuery(courseId);
    if (isLoading) {
        return <Loader2 className='w-4 h-4 animate-spin'></Loader2>
    }
    return (
        data?.purchased ? children : <Navigate to={`/course-detail/${courseId}`}></Navigate>
    )
}

export default PurchaseCourseProtected;