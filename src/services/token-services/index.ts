const TokenSchema = require('@/models/tokenModel');
import { connectDB } from '@/config/dbConfig';

// Create New Token [SERVICES]
export const createNewToken = async (token: any)=> {
    connectDB();
    try {
        const newToken = new TokenSchema(token);
        newToken.save().then(async ()=>{
            return newToken;
        }).catch((err: any)=>{
            console.log("[ERROR] Creating new token");
            console.log(err);
            return null;
        })
    }catch (error) {
        console.log("[EXCEPTION] Creating new token");
        console.log(error);
        return null;
    }
};

// Get Token By ID [SERVICES]
export const getTokenById = async (tokenId: string)=> {
    connectDB();
    const token = await TokenSchema.findById(tokenId).populate(["userId"]);
    console.log(token);
    try {
        if(token){
            return{exist: true, data: token};
        }else {
            return{exist: false, data: {}};
        }
    }catch(err){
        console.log("[ERROR] Getting token by tokenid");
        console.log(err);
        return {success: false, data:{}};
    }    
};

// Get Token By TOKENID [SERVICES]
export const getTokenByParams = async (data: object)=> {
    connectDB();
    try{
        const token = await TokenSchema.findOne(data);  
        return token;
    }catch(err) {
        console.log("[ERROR] Getting token by tokenid");
        console.log(err);
        return null;
    } 
};

module.exports = {
    createNewToken,
    getTokenById,
    getTokenByParams,
}