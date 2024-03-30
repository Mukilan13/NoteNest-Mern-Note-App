import mongoose from "mongoose"

const noteSchema = mongoose.Schema({
    title: String,
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

const Note = mongoose.model("notes", noteSchema)
export default Note;