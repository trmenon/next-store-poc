import { NextRequest, NextResponse } from "next/server";

export async function POST() {
    try{
        const response =  NextResponse.json({
            status: 200,
            success: true,
            data: null,
            message: "Logout successfull"
        });
        response.cookies.set("token", "", {
            httpOnly: true,
            path: "/",
            expires: new Date(0)
        });

        return response;
    }catch(err) {
        console.log('[ERROR] Get Request: main');
        console.log(err);
        return NextResponse.json({error: err}, {status: 500});
    }
}