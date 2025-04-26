import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Loader2, ThumbsDown } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectDemo3 } from '@/components/ui/select3';
import { SelectDemo4 } from '@/components/ui/select4';
import { useEditCourseMutation } from '@/features/api/courseApi';
import { toast } from 'sonner';
import { useGetCourseByIdQuery } from '@/features/api/courseApi';
import { usePublishCourseMutation } from '@/features/api/courseApi';





const CourseTab = () => {
    const navigate = useNavigate();
    const isPublished = false;
    const [previewThumbnails, setPreviewThumbnails] = useState("");
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
    });


    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();






    const params = useParams();
    const courseId = params.courseId;

    const { data: courseByIdData, isLoading: courseByIdLoading , refetch} = useGetCourseByIdQuery(courseId, {
        refetchOnMountOrArgChange: true,
    });
    useEffect(() => {
        if (courseByIdData?.course) {
            const course = courseByIdData?.course;
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: "",
            })
        }
    }, [courseByIdData]);



    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }




    const selectCategory = (value) => {
        setInput({ ...input, category: value });
    };



    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value });
    };




    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnails(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    }
    
    const [publishCourse , {data:publishData  , isLoading:publishLoading }] = usePublishCourseMutation();

    const publishStatusHandler = async (action) => {
        try {
            const response = await publishCourse({courseId , query: action});
            console.log(response);
            if(response.data){
                refetch(); 
                toast.success(response.data.message );
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to publish or unpublish course");
        }
    }



    const updateCourseHandler = async () => {
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle);
        formData.append("subTitle", input.subTitle);
        formData.append("description", input.description);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);
        formData.append("courseThumbnail", input.courseThumbnail);

        await editCourse({ formData, courseId });
    };





    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Course updated.");
        }
        if (error) {
            toast.error(error.data.message || "failed to update course")
        }
    }, [isSuccess, error]);



    // Adding a spinner 
    // console.log(courseByIdLoading);

    if (courseByIdLoading) return <h1>Loading...</h1>








    return (
        <Card className="p-4">
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <CardTitle className="text-lg">Basic Course Information</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Make changes to your course here. Click save when you’re done.
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button disabled={courseByIdData?.course.lectures.length  === 0} variant="outline" onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}>
                        {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
                    </Button>
                    <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                        Remove Course
                    </Button>
                </div> 
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <Label className="block mb-1 text-sm font-medium text-gray-700">Title</Label>
                        <Input
                            name="courseTitle"
                            placeholder="Enter course title"
                            type="text"
                            value={input.courseTitle}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div>
                        <Label className="block mb-1 text-sm font-medium text-gray-700">Subtitle</Label>
                        <Input
                            name="subTitle"
                            placeholder="Enter course subtitle"
                            type="text"
                            value={input.subTitle}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div>
                        <Label className="block mb-1 text-sm font-medium text-gray-700">Description</Label>
                        <textarea
                            name="description"
                            placeholder="Enter course description"
                            className="w-full border rounded px-3 py-2 text-sm resize-none"
                            rows="5"
                            value={input.description}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='flex gap-5 items-center'>
                        <div>
                            <SelectDemo3 selectCategory={selectCategory} />
                        </div>
                        <div>
                            <SelectDemo4 selectCourseLevel={selectCourseLevel} defaultvalue={input.courseLevel}/>
                        </div>
                        <div className="flex flex-col gap-2 w-full  shadow-sm">
                            <label className="text-sm font-medium text-black-700">Price (INR)</label>
                            <input
                                type="number"
                                name="coursePrice"
                                value={input.coursePrice}
                                placeholder="199"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-400 focus:border-transparent"
                                onChange={changeEventHandler}
                            />
                        </div>
                    </div>
                    <div className="space-y-6 max-w-md p-6 border border-gray-200 rounded-2xl shadow-sm bg-white">
                        {/* File Input */}
                        <div>
                            <Label>Course Thumbnail</Label>
                            <Input
                                type="file"
                                onChange={selectThumbnail}
                                accept="image/*"
                                className="w-fit"
                            />
                            {
                                previewThumbnails && (
                                    <img src={previewThumbnails} className='w-64 h-40 object-cover rounded-md my-2 border' alt='course Thumbnails'></img>
                                )
                            }

                        </div>


                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4">
                            <Button variant="outline" className="rounded-md px-4 py-2" onClick={() => navigate("/admin/course")}  >
                                Cancel
                            </Button>
                            <Button
                                disabled={isLoading} onClick={updateCourseHandler}
                                className="rounded-md px-4 py-2 flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Please wait...
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
};




export default CourseTab;
