import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import VideoPlayer from '@/components/ui/videoplayer';
import { useGetCourseProgressQuery, useUpdateLectureProgressMutation, useCompleteCourseMutation, useInCompleteCourseMutation } from '@/features/api/courseProgressApi';
import { CheckCircle, CheckCircle2, CirclePlay, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseProgress = () => {
  const { courseId } = useParams();

  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId, { skip: !courseId });
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse] = useCompleteCourseMutation();
  const [inCompleteCourse] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);
  const [isUpdatingLecture, setIsUpdatingLecture] = useState(false);
  const [completedStatus, setCompletedStatus] = useState(false); // Local state to track course completion status

  useEffect(() => {
    if (data?.message) {
      toast.success(data?.message);
    }
  }, [data]);

  useEffect(() => {
    if (data?.data?.completed !== undefined) {
      setCompletedStatus(data.data.completed);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data?.data?.courseDetails) return <p>Failed to load course details.</p>;

  const { courseDetails, progress } = data.data;
  const initialLecture = currentLecture || courseDetails.lectures?.[0];

  const isLectureCompleted = (lectureId) => {
    return progress?.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    setIsUpdatingLecture(true);
    try {
      await updateLectureProgress({ courseId, lectureId }).unwrap();
      await refetch();
    } catch (error) {
      toast.error("Failed to update progress. Please try again.");
    } finally {
      setIsUpdatingLecture(false);
    }
  };

  const handleSelectLecture = (lecture) => {
    if (isUpdatingLecture) return;
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    try {
      await completeCourse(courseId).unwrap();
      setCompletedStatus(true);
      toast.success("Course marked as completed!");
      await refetch();
    } catch (error) {
      toast.error("Failed to mark course as completed.");
    }
  };

  const handleIncompleteCourse = async () => {
    try {
      await inCompleteCourse(courseId).unwrap();
      setCompletedStatus(false);
      toast.success("Course marked as incomplete.");
      await refetch();
    } catch (error) {
      toast.error("Failed to mark course as incomplete.");
    }
  };

  return (
    <div className='max-w-7xl mx-auto p-4 mt-10'>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-bold'>{courseDetails.courseTitle}</h1>
        <Button
          onClick={completedStatus ? handleIncompleteCourse : handleCompleteCourse}
          variant={completedStatus ? 'outline' : 'default'}
          disabled={isLoading}
        >
          {completedStatus ? (
            <div className='flex items-center'>
              <CheckCircle className='h-4 w-4 mr-2' />
              <span>Completed</span>
            </div>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        {/* Video Player Section */}
        <div className='flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4'>
          {initialLecture?.videoUrl && (
            <VideoPlayer
              currentLecture={currentLecture}
              initialLecture={initialLecture}
              handleLectureProgress={handleLectureProgress}
            />
          )}

          <div className='mt-2'>
            <h3 className='font-medium text-lg'>
              {`Lecture ${courseDetails.lectures.findIndex(
                (lec) => lec._id === (currentLecture?._id || initialLecture._id)
              ) + 1} : ${currentLecture?.lectureTitle || initialLecture?.lectureTitle}`}
            </h3>
          </div>
        </div>

        {/* Lecture List Section */}
        <div className='flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200'>
          <h2 className='font-semibold text-xl mb-4'>Course Lectures</h2>
          <div className='flex-1 overflow-y-auto'>
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${lecture._id === (currentLecture?._id || initialLecture._id)
                    ? 'bg-gray-200'
                    : 'dark:bg-gray-800'
                  }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className='flex items-center'>
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className='text-green-500 mr-2' />
                    ) : (
                      <CirclePlay size={24} className='text-black-500 mr-2' />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">{lecture.lectureTitle}</CardTitle>
                    </div>
                  </div>

                  {lecture._id === (currentLecture?._id || initialLecture._id) && isUpdatingLecture ? (
                    <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
                  ) : (
                    isLectureCompleted(lecture._id) && (
                      <Badge variant={"outline"} className="bg-green-200 text-green-600 text-sm">
                        completed
                      </Badge>
                    )
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
