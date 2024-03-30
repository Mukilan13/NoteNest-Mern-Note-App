import Note from "../models/noteModel.js";

const createNote = async (req, res) => {
    try {
        // Get the sent in data of request body
        const { title, content } = req.body;

        // Create a new note with it
        const note = await Note.create({
            title: title,
            content: content,
            user: req.user._id
        });

        res.json({ note: note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const fetchNotes = async (req, res) => {
    // Find the notes
    const notes = await Note.find({ user: req.user._id });

    // Response with them
    res.json({ notes: notes })
}

const fetchNote = async (req, res) => {
    // Get the id from the url
    const noteId = req.params.id

    // Find a single note using ID
    const note = await Note.findOne({ id: noteId, user: req.user._id });

    // Response with them
    res.json({ note: note })
}

const updateNote = async (req, res) => {
    // Get the id from the url
    const noteId = req.params.id

    // Get the data off the request body
    const title = req.body.title
    const content = req.body.content

    // Find the update record
    await Note.findOneAndUpdate({ _id: noteId, user: req.user._id }, {
        title: title,
        content: content
    })

    // Find updated note
    const note = await Note.find()

    // Respond with them
    res.json({ note: note })
}

const deleteNote = async (req, res) => {
    // Get the id from the url
    const noteId = req.params.id

    // Deleting a note using the id
    await Note.findOneAndDelete({ _id: noteId, user: req.user._id })

    // Respond with them
    res.json({ success: "Deleted successfuly" })
}

export {
    createNote,
    fetchNotes,
    fetchNote,
    updateNote,
    deleteNote
}