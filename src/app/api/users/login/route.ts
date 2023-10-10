import { NextRequest, NextResponse } from "next/server";
import {getUserByEmail} from '@/services';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json();
        const user = await getUserByEmail(reqBody?.email);
        if(user?.exist) {
            if(user?.data?.isEmailVerified === false) {
                return NextResponse.json({
                    message: 'Please verify your email before you login',
                    data: {},
                    success: false,
                    status: 200
                });
            }
            const validatePassword = await bcrypt.compare(reqBody.password, user.data.password);
            if(!validatePassword) {
                return NextResponse.json({
                    message: 'Entered password does not match with registered password.',
                    data: {},
                    success: false,
                    status: 200
                });
            }
            if(validatePassword) {
                const token = jwt.sign(
                    {id: user.data._id, email: user.data.email}, 
                    process.env.jwt_secret!, 
                    {expiresIn: "1d"}
                );
                const response = NextResponse.json({
                    message: 'Login success',
                    data: token,
                    success: true,
                    status: 200
                });
                response.cookies.set(
                    "token", token,
                    {
                        httpOnly: true,
                        sameSite: 'strict',
                        expires: new Date(Date.now() + 1000*60*60*24)
                    }
                );

                return response;
            }
        }
        if(!user?.exist) {
            return NextResponse.json({
                message: 'User is not registered with us.',
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