import React from "react";
import useNotesPage from "../../utils/notesUtils";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewListTwoToneIcon from "@mui/icons-material/ViewListTwoTone";
import "./notes.css";

const Notes = () => {
  const { notes, noteData, selectedNoteId, handleDataChange, handleSelectedNote, createNote, saveNote, deleteNote, logout, message, isFormSubmitted, addListPrefix, textareaRef, toogleNotes, handleToogleNotes, setToogleNotes } = useNotesPage();

  return (
    <>
      <div
        className="message"
        style={{
          transform: message ? "translate(-50%,0)" : "translate(-50%,-60px)",
        }}
      >
        {isFormSubmitted ? (
          <CheckCircleTwoToneIcon className="success" />
        ) : (
          <CancelTwoToneIcon className="failure" />
        )}
        {message}
      </div>
      <div className="controls-bar">
        <div className={`left ${toogleNotes ? "active" : ""}`}>
          <h1>All Notes</h1>
          <NoteAddOutlinedIcon className="add-note" onClick={createNote} />
        </div>
        <div className="right">
          <ViewListTwoToneIcon
            className="toogle-notes"
            onClick={handleToogleNotes}
          />
          <div className="controls">
            <button className={`save`} type="submit" onClick={saveNote}>
              Save Note
            </button>
            <FormatListBulletedIcon
              className="add-list"
              onClick={() => addListPrefix("▣")}
            />
            <LogoutOutlinedIcon className="logout" onClick={logout} />
          </div>
        </div>
      </div>
      <div className="content-container" action="">
        <div className={`all-notes ${toogleNotes ? "active" : ""}`}>
          {notes &&
            notes.map((note) => (
              <div
                className={`note ${
                  selectedNoteId === note._id ? "selected" : ""
                }`}
                onClick={() => handleSelectedNote(note)}
                key={note._id}
              >
                <div className="title" name="title">
                  {note.title}
                </div>
                <DeleteTwoToneIcon
                  className="delete"
                  onClick={() => deleteNote(note._id)}
                />
              </div>
            ))}
        </div>
        <div className="textarea-container">
          <textarea
            name="content"
            ref={textareaRef}
            value={noteData.content}
            onChange={handleDataChange}
            placeholder="Start writing your notes ..."
            onClick={() => setToogleNotes(false)}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Notes;
