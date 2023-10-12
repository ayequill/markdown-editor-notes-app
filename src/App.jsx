import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db, noteCollection } from "../firebase";
import "./styles/App.scss";

export default function App() {
  const [notes, setNotes] = React.useState([]);

  const [currentNoteId, setCurrentNoteId] = React.useState("");
  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];
  const [tempNotes, setTempNotes] = React.useState("");

  const sortedArray = notes.sort((a, b) => b.updatedAt - a.updatedAt);

  useEffect(() => {
    const unsubscribe = onSnapshot(noteCollection, (snapshot) => {
      // Sync up our local notes array with the snapshot data
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);
  
  React.useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);

  React.useEffect(() => {
    if (currentNote) {
      setTempNotes(currentNote.body);
    }
  }, [currentNote]);

  // Debouncing
  React.useEffect(() => {
    const timeID = setTimeout(() => {
      if (tempNotes != currentNote.body) {
      updateNote(tempNotes)
      }
    }, 500)
    
    return () => clearTimeout(timeID)
  }, [tempNotes])

  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    // setNotes((prevNotes) => [newNote, ...prevNotes]);
    const newNoteRef = await addDoc(noteCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId);
    await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true });
  }

  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={sortedArray}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          <Editor tempNotes={tempNotes} setTempNotes={setTempNotes} />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
