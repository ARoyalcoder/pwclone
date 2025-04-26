import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useCreateLectureMutation } from '@/features/api/courseApi'
import { useGetCourseLectureQuery } from '@/features/api/courseApi'
import Lecture from './Lecture'





const CreateLecture = () => {
    const navigate = useNavigate();
    const [lectureTitle, setLectureTitle] = useState("");
    const params = useParams();
    const courseId = params.courseId;


    const [createLecture, { data, isLoading, error, isSuccess }] = useCreateLectureMutation();

    const { data: lectureData, isLoading: lectureLoading, isSuccess: lectureSuccess, isError: lectureError , refetch} = useGetCourseLectureQuery(courseId);


    const createLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId });
    }



    useEffect(() => {
        if (isSuccess) {
            refetch(); 
            toast.success(data.message);
        }
        if (error) {
            toast.error(error?.data?.message)
        }
    }, [isSuccess, error])


    return (
        <div className="flex-1 max-w-3xl mx-auto mt-20 p-8 bg-white shadow-lg rounded-2xl">
            <div className="space-y-6">
                <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Lecture Title
                    </Label>
                    <input
                        type="text"
                        name="CourseTitle"
                        placeholder="Your Title Name"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='flex items-center gap-3'>
                    <Button variant="outline" onClick={() => navigate(`/admin/course/${courseId}`)}>Back to course</Button>
                    <Button disabled={isLoading} onClick={createLectureHandler}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            "Create Lecture"
                        )}
                    </Button>
                </div>
                <div className='mt-10'>
                    {
                        lectureLoading ? (<p>Loading lecture....</p>) : lectureError ? (<p>Failed to load lecture </p>) : lectureData.lectures.length === 0 ? <p>No Lecture available </p> :
                            (lectureData.lectures.map((lecture, index) => (
                                <Lecture key={lecture._id}  lecture={lecture} index={index} courseId={courseId} />
                            )))
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateLecture;