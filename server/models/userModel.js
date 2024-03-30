import mongoose from "mongoose";

// user schema
const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'notes' }]
})

const User = mongoose.model("users", userSchema)

export default User