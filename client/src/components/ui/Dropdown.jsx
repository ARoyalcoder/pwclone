import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


import { Link } from "react-router-dom"




const Dropdown = ({ logoutHandler, user }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src={user.PhotoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                    <AvatarFallback></AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem> <Link to="my-learning"> My-Learning </Link></DropdownMenuItem>
                    <DropdownMenuItem> <Link to="profile">Edit Profile</Link> </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
                {user.role === "instructor" && (<>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link to="admin/dashboard">Dashboard</Link></DropdownMenuItem>
                </>)} 

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Dropdown;