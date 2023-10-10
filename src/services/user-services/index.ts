const UserSchema = require('@/models/userModel');
import { connectDB } from '@/config/dbConfig';
import { sendEmail } from '@/helpers/sendEmail';
import { error } from 'console';

// Get User By ID [SERVICES]
export const getUserById = async (userId: string)=> {
    connectDB();
    const user = await UserSchema.findById(userId);
    try {
        if(user){
            return{exist: true, data: user};
        }else {
            return{exist: false, data: {}};
        }
    }catch(err){
        console.log("[ERROR] Getting user by userid");
        console.log(err);
        return {success: false, data:{}};
    }    
};

// Get User By Email [SERVICES]
export const getUserByEmail = async (email: string)=> {
    connectDB();
    const user = await UserSchema.findOne({email});
    try {
        if(user){
            return{exist: true, data: user};
        }else {
            return{exist: false, data: {}};
        }
    }catch(err){
        console.log("[ERROR] Getting user by email");
        console.log(err);
        return {success: false, data:{}};
    }    
};

// Create New User [SERVICES]
export const createNewUser = async (user: any)=> {
    connectDB();
    try {
        const newUser = new UserSchema(user);
        newUser.save().then(async ()=>{
            await sendEmail({
                email: newUser?.email,
                emailType: 'VERIFICATION',
                userId: newUser?._id
            })
            return newUser;
        }).catch((err: any)=>{
            console.log("[ERROR] Creating new user");
            console.log(err);
            return null;
        })
    }catch (error) {
        console.log("[EXCEPTION] Creating new user");
        console.log(error);
        return null;
    }
};

// Update User by UserId [SERVICES]
export const updateUserById = async (userId: string, data: any)=> {
    connectDB();
    try{
        const user = await UserSchema.findByIdAndUpdate(userId, data, { new: true });
        return user;
    }catch(err) {
        console.log('[EXCEPTION] Updating user by user id');
        console.log(error);
        return null;
    }
}

module.exports = {
    getUserByEmail,
    createNewUser,
    getUserById,
    updateUserById
}