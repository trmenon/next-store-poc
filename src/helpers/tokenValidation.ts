import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const validateToken = async(request: NextRequest)=> {
    try{
        const token = request.cookies.get("token")?.value;
        if(token) {
            const decrypted_token: any = jwt.verify(token, process.env.jwt_secret!);
            return {validated: true,userId: decrypted_token.id};
        }
        return {validated: false,userId: null};
    }catch(err) {
        console.log('[ERROR] Token Validation');
        console.log(err);
        return {validated: false,userId: null};
    }
}