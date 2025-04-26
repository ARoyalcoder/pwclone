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



export function SelectDemo({getSelectedCategory}) {
  return (
    <Select onValueChange={getSelectedCategory}>
      <h1>Category</h1>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Medical Specializations</SelectLabel>
          <SelectItem value="dermatology">Dermatology</SelectItem>
          <SelectItem value="cardiology">Cardiology</SelectItem>
          <SelectItem value="neurology">Neurology</SelectItem>
          <SelectItem value="orthopedics">Orthopedics</SelectItem>
          <SelectItem value="pediatrics">Pediatrics</SelectItem>
          <SelectItem value="psychiatry">Psychiatry</SelectItem>
          <SelectItem value="gynecology">Gynecology</SelectItem>
          <SelectItem value="radiology">Radiology</SelectItem>
          <SelectItem value="oncology">Oncology</SelectItem>
          <SelectItem value="ent">ENT (Otolaryngology)</SelectItem>
          <SelectItem value="anesthesiology">Anesthesiology</SelectItem>
          <SelectItem value="general-surgery">General Surgery</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
