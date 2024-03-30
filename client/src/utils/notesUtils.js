import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useNotesPage() {

    const [notes, setNotes] = useState(null);
    const [noteData, setNoteData] = useState({
        title: "",
        content: "",
    });
    const [selectedNoteId, setSelectedNoteId] = useState(null); // State to track the id of the selected note
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [message, setMessage] = useState("");
    const [toogleNotes, setToogleNotes] = useState(true);
    const navigate = useNavigate();
    const textareaRef = useRef(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        // Select the first note by default when notes are fetched
        if (notes && notes.length > 0 && !selectedNoteId) {
            setSelectedNoteId(notes[0]._id);
            setNoteData((prevNoteData) => ({
                ...prevNoteData,
                title: notes[0].title,
                content: notes[0].content,
            }));
        }
    }, [notes, selectedNoteId]);

    const fetchNotes = async () => {
        try {
            // Fetch notes
            const res = await axios.get("/notes");
            // Set to state
            setNotes(res.data.notes);
        } catch (error) {
            if (error.response.status === 401) {
                // Redirect user to login page
                window.location.href = '/login'; // Change '/login' to your actual login page URL
            } else {
                // Handle other errors
                console.error("Error fetching notes:", error);
            }
        }
    };

    const handleToogleNotes = () => {
        setToogleNotes((prev) => !prev);
    };

    const handleDataChange = (e) => {
        const { value } = e.target;
        setNoteData({
            ...noteData,
            title: noteData.content.split("\n")[0],
            content: value,
        });
    };

    const addListPrefix = (prefix) => {
        const textarea = textareaRef.current;
        const { selectionStart, selectionEnd, value } = textarea;

        const newValue =
            value.substring(0, selectionStart) +
            prefix +
            value
                .substring(selectionStart, selectionEnd)
                .replace(/\n/g, `\n${prefix}`) +
            value.substring(selectionEnd);

        setNoteData({ ...noteData, content: newValue });
        // Restore cursor position
        textarea.focus();
        textarea.selectionStart = selectionStart + prefix.length;
        textarea.selectionEnd = textarea.selectionStart;
    };

    const handleSelectedNote = (selectedNote) => {
        // Updating the state
        setSelectedNoteId(selectedNote._id);
        // Setting the data of the selected note to the state object
        setNoteData({
            title: selectedNote.title,
            content: selectedNote.content,
        });

        setToogleNotes(false)
    };

    const createNote = async () => {
        try {
            // Creating a new note
            await axios.post("/notes", {
                title: "New note ...",
                content: "",
            });

            // Displaying message
            setIsFormSubmitted(true)
            setMessage("New note created")
            setTimeout(() => {
                setMessage("")
            }, 2000)

            // refetch the notes after creating a note
            fetchNotes();
        } catch (err) {
            console.log(err);
        }
    };

    const saveNote = async () => {
        try {
            if (!selectedNoteId) {
                console.log("No note selected to save");
                return;
            }

            // Save the note after updating
            await axios.put(`/notes/${selectedNoteId}`, {
                title: noteData.title,
                content: noteData.content,
            });

            // Displaying message
            setIsFormSubmitted(true)
            setMessage("Note saved")
            setTimeout(() => {
                setMessage("")
            }, 2000)

            // Refetch the notes after saving
            fetchNotes();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            // Delete a note using the id
            await axios.delete(`/notes/${noteId}`);

            // Displaying message
            setIsFormSubmitted(true)
            setMessage("Note deleted")
            setTimeout(() => {
                setMessage("")
            }, 2000)

            // Refetch the notes after deleting
            fetchNotes();

            // Reset noteData
            setNoteData({
                title: "",
                content: "",
            })
        } catch (err) {
            console.log(err);
        }
    };

    const logout = async () => {
        try {
            // Logout from notes page
            const res = await axios.post("/logout")
            // Redirect to home page after logout
            setIsFormSubmitted(true)
            setMessage(res.data.message)
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err) {
            console.log(err);
        }
    }

    return { notes, noteData, selectedNoteId, handleDataChange, handleSelectedNote, createNote, saveNote, deleteNote, logout, message, isFormSubmitted, addListPrefix, textareaRef, toogleNotes, handleToogleNotes, setToogleNotes }
}