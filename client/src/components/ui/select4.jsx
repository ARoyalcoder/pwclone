import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectDemo4({ selectCourseLevel }) {
    return (
        <Select onValueChange={selectCourseLevel}>
            <h1>Course Level</h1>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel >Course Level</SelectLabel>
                    <SelectItem value="Begginer">Begginer</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
