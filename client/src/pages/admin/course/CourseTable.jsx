import React from 'react';
import { Button } from '@/components/ui/button';
import { TableDemo } from '@/components/ui/table1';
import { useNavigate } from 'react-router-dom';

const CourseTable = () => {
    const navigate = useNavigate();

    return (
        <div className='mt-20'>
            <Button
                onClick={() => navigate('create')}
                className="mb-4 text-white bg-blue-600 hover:bg-blue-700"
            >
                Create a New Course
            </Button>
            <TableDemo />
        </div>
    );
};

export default CourseTable;
