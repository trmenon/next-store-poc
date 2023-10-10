import mongoose from "mongoose";
const {Schema}= mongoose;

const TokenSchema = new Schema({
    tokenString: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    emailType: {
        type: String,
        enum: ['VERIFICATION', 'RESET'],
        default: false,
    },
}, {timestamps: true});

module.exports = mongoose.models.Token ||  mongoose.model("Token", TokenSchema);