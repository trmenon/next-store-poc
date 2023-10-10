import { NextRequest, NextResponse } from "next/server";
import {getUserByEmail, createNewUser} from '@/services';

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json();
        const user = await getUserByEmail(reqBody?.email);
        if(user?.exist) {
            return NextResponse.json({
                message: 'User already registered. Proceed with Login',
                data: {},
                success: false,
                status: 200
            });
        }
        if(!user?.exist) {
            console.log(reqBody);
            const newUser = await createNewUser(reqBody);            
               
            return NextResponse.json({
                message: 'User has been successfully registered. ',
                data: newUser,
                success: true,
                status: 200
            });
        }
    }catch(err) {
        console.log('[ERROR] Get Request: main');
        console.log(err);
        return NextResponse.json({error: err}, {status: 500});
    }
}