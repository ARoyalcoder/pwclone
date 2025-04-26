import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const categories = [
    { id: "dermatology", label: "Dermatology" },
    { id: "cardiology", label: "Cardiology" },
    { id: "neurology", label: "Neurology" },
    { id: "orthopedics", label: "Orthopedics" },
    { id: "pediatrics", label: "Pediatrics" },
    { id: "psychiatry", label: "Psychiatry" },
    { id: "gynecology", label: "Gynecology" },
    { id: "radiology", label: "Radiology" },
    { id: "oncology", label: "Oncology" },
    { id: "ent", label: "ENT (Otolaryngology)" },
    { id: "anesthesiology", label: "Anesthesiology" },
    { id: "general-surgery", label: "General Surgery" },
];


const Filter = ({ handleFilterChange }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortByPrice, setSortByPrice] = useState("");

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevCategories) => {
            const newCategories = prevCategories.includes(categoryId)
                ? prevCategories.filter((id) => id !== categoryId)
                : [...prevCategories, categoryId];

            handleFilterChange(newCategories, sortByPrice);
            return newCategories;
        });
    };

    const selectByPriceHandler = (selectedValue) => {
        setSortByPrice(selectedValue);
        handleFilterChange(selectedCategories, selectedValue);
    }
    return (
        <div className="w-full md:w-[20%]">
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-lg md:text-xl mr-3">Filter Options</h1>
                <Select onValueChange={selectByPriceHandler}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort by price</SelectLabel>
                            <SelectItem value="low">Low to High</SelectItem>
                            <SelectItem value="high">High to Low</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Separator className="my-4" />
            <div>
                <h1 className="font-semibold mb-2">CATEGORY</h1>
                {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2 my-2">
                        <Checkbox
                            id={category.id}
                            onCheckedChange={() => handleCategoryChange(category.id)}
                        />
                        <Label htmlFor={category.id}>{category.label}</Label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filter;