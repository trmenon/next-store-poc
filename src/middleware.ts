import { NextRequest, NextResponse } from "next/server";
import { checkPublicPage } from "./helpers/isPublicRoute";

export function middleware(request: NextRequest){
    try{
        const path = request.nextUrl.pathname;
        const isPublicPage = checkPublicPage(path);
        const token = request.cookies.get("token")?.value;
        if(isPublicPage) {
            if(token) {
                // console.log('Public route with token hit');
                return NextResponse.redirect(new URL("/", request.nextUrl));
            }else {
                // console.log('Public route with no token hit');
                return NextResponse.next();
            }
        }else {
            if(token) {
                // console.log('Private route with token hit');
                return NextResponse.next();
            }else {
                // console.log('Private route with no token hit');
                return NextResponse.redirect(new URL("/login", request.nextUrl));
            }
        }
    }catch(err) {
        console.log('[ERROR] Middleware');
        console.log(err);
        process.exit(0);
    }
}

export const config = {matcher: ["/", "/profile", "/login", "/register", "/verify-email"]};