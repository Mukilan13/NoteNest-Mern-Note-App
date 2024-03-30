// Load env variables
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

// Import dependencies
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { protect } from './middleware/authMiddleware.js';
import { login, logout, signup } from './controllers/userContoller.js';
import { createNote, fetchNotes, fetchNote, updateNote, deleteNote } from './controllers/noteController.js';
import connectToDB from './config/connect.js';

// Create Express app
const app = express();

// Configure dependencies
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'https://notenest-mukilan.netlify.app',
    credentials: true
}));

// Connect to database
connectToDB()

// User routes
app.post("/signup", signup)
app.post("/login", login)
app.post("/logout", logout)

// Note routes
app.post("/notes", protect, createNote)
app.get("/notes", protect, fetchNotes)
app.get("/notes/:id", protect, fetchNote)
app.put("/notes/:id", protect, updateNote)
app.delete("/notes/:id", protect, deleteNote)

app.listen(process.env.PORT)