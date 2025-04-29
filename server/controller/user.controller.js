import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js"
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";



export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        const token = generateToken(res, newUser, `Welcome ${newUser.name}`);

        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to register",
        });
    }
};


// for login 

export const login = async (req, res) => {
    try {

        // take the email or password from user 


        const { email, password } = req.body;


        // console.log(req.body);
        // to check the email and password are given or not 


        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields arr required "
            })
        }

        // to check email present in database or not 


        const user = await User.findOne({ email });
        // console.log(user);

        // if user email is not present in database show error 


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email or password "
            })
        }


        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Wrong Password !! Please Enter correct password ",
            })
        }

        generateToken(res, user, `Welcome back ${user.name}`);


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to Login "
        })
    }
}

// for logout 

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "Logged out successfull",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to Logout "
        })
    }
}


export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;

        const user = await User.findById(userId).select("-password").populate("enrolledCourses");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Profile not found ",
            })
        }
        return res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to load user",
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found ",
                success: false,
            })
        }

        // extract public id of the old image from the url is it exists : 
        if (user.PhotoUrl) {
            const publicId = user.PhotoUrl.split("/").pop().split(".")[0];   //extract public id 
            deleteMediaFromCloudinary(publicId);
        }


        // upload new photo  
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const PhotoUrl = cloudResponse.secure_url;

        const updatedData = { name, PhotoUrl };
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "Profile updated successfully "
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update Profile ",
        })
    }
}
