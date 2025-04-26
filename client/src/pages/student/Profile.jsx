import React, { useEffect, useSyncExternalStore } from 'react'
import Course from './Course';
import { useLoadUserQuery } from '@/features/api/authApi';
import { useState } from 'react';
import DialogDemo from '@/components/ui/Dialog1';
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@/components/ui/avatar';

import { useUpdateUserMutation } from '@/features/api/authApi';



const Profile = () => {

    const [name, setName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    // const enrolledCourses = [1, 2];
    // const { data, isLoading } = useLoadUserQuery();
    // console.log(useLoadUserQuery());;
    const { data, isLoading, refetch } = useLoadUserQuery();

    // update user profile  
    const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, error, isSuccess, isError }] = useUpdateUserMutation();

    const onChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file)
            setProfilePhoto(file);
    }

    // update user handler  
    const updateUserHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", name);
        formData.append("profilePhoto", profilePhoto);
        await updateUser(formData);
    }

    useEffect(() => {
        refetch();
    }, [])



    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(data.message || "Profile updated.");
        }
        if (isError) {
            toast.error(error.message || "failed to update profile ");
        }
    }, [error, updateUserData, isSuccess, isError]);

    if (isLoading) {
        return <>
            <h1>Profile Loading.....</h1>
        </>
    }

    const { user } = data;
    console.log(user);

    return (
        <div className='max-w-4xl mx-auto px-4 my-24'>
            <h1 className='font-bold text-2xl text-center md:text-left '>PROFILE</h1>
            <div className='flex flex-col md:flex-row items-center md:items-start '>
                <div className='flex flex-col items-center '>
                    <Avatar className=" h-24 w-24 md:h-32 md:w-32 mb-4">
                        <AvatarImage src={user?.PhotoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                </div>
                <div className='ml-4'>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-300'>
                            Name : <span className=''>{user.name}</span>
                        </h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-300'>
                            Email : <span className=''>{user.email}</span>
                        </h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-300'>
                            Role : <span className=''>{user.role.toUpperCase()}</span>
                        </h1>
                    </div>
                    {/* Dialog box is here  */}
                    <DialogDemo
                        name={name}
                        updateUserIsLoading={updateUserIsLoading}
                        onChangeHandler={onChangeHandler}
                        setName={setName}
                        updateUserHandler={updateUserHandler}
                    />
                </div>
            </div>
            <div>
                <h1 className='font-medium text-lg'>Courses you're enrolled in</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
                    {
                        user.enrolledCourses.length === 0 ? <h1>you haven't enrolled yet </h1> : (
                            user.enrolledCourses.map((course) => <Course course={course} key={course._id} />)
                        )
                    }
                </div>
            </div>
        </div>
    )
}


export default Profile;