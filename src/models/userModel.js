import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const {Schema}= mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    master: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

UserSchema.pre("save", async function(next){
    try{
        const rounds= 10;
        const salt = await bcrypt.genSalt(rounds);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }catch(err){
        console.log("[ERROR] Password Hashing failed");
        console.log(err);
        next();
    }
});

module.exports = mongoose.models.User ||  mongoose.model("User", UserSchema);