import { validateToken } from "@/helpers/tokenValidation";
import { getUserById } from "@/services";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try{
        console.log('Hitting me route');
        const validate = await validateToken(request);
        if(validate?.validated) {
            const user = await getUserById(validate?.userId);
            if(user?.exist === true) {
                return NextResponse.json({
                    message: 'Main route access granted and responded with success message',
                    data: user?.data,
                    success: true,
                    status: 200
                });
            }else {
                return NextResponse.json({
                    message: 'Main route responded with non-existent user',
                    data: {},
                    success: false,
                    status: 200
                });
            }
        }else {
            return NextResponse.json({
                message: 'Main route encountered invalidated user',
                data: {},
                success: false,
                status: 200
            });
        }
        const {searchParams} = new URL(request.nextUrl);
        // console.log(searchParams.get('user'));
        
    }catch(err) {
        console.log('[ERROR] Get Request: main');
        console.log(err);
        return NextResponse.json({error: err}, {status: 500});
    }
}