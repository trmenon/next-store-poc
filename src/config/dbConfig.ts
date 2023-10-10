import mongoose from "mongoose";

export const connectDB = async()=> {
    try{
        mongoose.connect(process.env.mongo_url!);
        const connection = mongoose.connection;
        connection.on("connected", ()=> {
            console.log("[SUCCESS] Connection to mongodb has been established");
        })
        connection.on("error", ()=> {
            console.log("[ERROR] Connection to mongodb has failed");
        })
    }catch(err) {
        console.log('[ERROR] Connecting to database terminated');
        console.log(err);
        process.exit(0);
    }
}