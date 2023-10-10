import { getTokenByParams, getUserById, updateUserById } from "@/services";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(request: NextRequest) {
    try{
        const reqBody = await request.json();
        const tokenId = reqBody?.token;
        const token = await getTokenByParams({tokenString: tokenId});
        if(token) {            
            const userId = token?.userId;
            const user = await getUserById(userId);
            if(user?.exist) {
                const upd_user = await updateUserById(
                    user?.data?._id,
                    {isEmailVerified: true}
                );
                return NextResponse.json({
                    message: 'Your email has been verified',
                    data: {},
                    success: true,
                    status: 200
                });
            }else {
                // Invalid user
                return NextResponse.json({
                    message: 'You are not registered with us.',
                    data: {},
                    success: false,
                    status: 200
                });
            }
        }else {
            
            // Invalid token
            return NextResponse.json({
                message: 'You are trying to activaate an invalid request.',
                data: {},
                success: false,
                status: 200
            });
        }
    }catch(err) {
        console.log('[ERROR] Get Request: main');
        console.log(err);
        return NextResponse.json({error: err}, {status: 500});
    }
    
}