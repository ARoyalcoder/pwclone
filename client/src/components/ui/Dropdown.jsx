// import { Button } from "@/components/ui/button"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuPortal,
//     DropdownMenuSeparator,
//     DropdownMenuShortcut,
//     DropdownMenuSub,
//     DropdownMenuSubContent,
//     DropdownMenuSubTrigger,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
// } from "@/components/ui/avatar"

// import { Link } from "react-router-dom"

// const Dropdown = ({ logoutHandler, user }) => {
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Avatar className="cursor-pointer">
//                     <AvatarImage src={user.PhotoUrl || "https://github.com/shadcn.png"} alt="user avatar" />
//                     <AvatarFallback>U</AvatarFallback>
//                 </Avatar>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent className="w-56">
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>

//                     <DropdownMenuItem asChild>
//                         <Link to="/my-learning">My Learning</Link>
//                     </DropdownMenuItem>

//                     <DropdownMenuItem asChild>
//                         <Link to="/profile">Edit Profile</Link>
//                     </DropdownMenuItem>

//                     <DropdownMenuItem onClick={logoutHandler}>
//                         Log out
//                     </DropdownMenuItem>

//                 </DropdownMenuGroup>

//                 {user.role === "instructor" && (
//                     <>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem asChild>
//                             <Link to="/admin/dashboard">Dashboard</Link>
//                         </DropdownMenuItem>
//                     </>
//                 )}
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// }

// export default Dropdown;


import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

const Dropdown = ({ logoutHandler, user }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user.PhotoUrl || "https://github.com/shadcn.png"} alt="user avatar" />
                    <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                <DropdownMenuGroup>

                    <DropdownMenuItem onClick={() => handleNavigation("/my-learning")}>
                        My Learning
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleNavigation("/profile")}>
                        Edit Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={logoutHandler}>
                        Log out
                    </DropdownMenuItem>

                </DropdownMenuGroup>

                {user.role === "instructor" && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleNavigation("/admin/dashboard")}>
                            Dashboard
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Dropdown;
