import React from 'react'
import { Button } from '@/components/ui/button';
import { TableDemo } from '@/components/ui/table1';
import { useNavigate } from 'react-router-dom';
const CourseTable = () => {
    const navigate = useNavigate(); 
    return (
        <div className='mt-20'>
            <Button onClick={() => navigate(`create`)}>create a new course </Button>
            <TableDemo />
        </div>
    )
}

export default CourseTable;