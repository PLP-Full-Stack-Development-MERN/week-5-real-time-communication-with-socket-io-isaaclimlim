import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const NotesContext = createContext();

const socket = io("https://noteapp-lax4.onrender.com");

export const NotesProvider = ({ children }) => {
  const [room, setRoom] = useState(null);
  const [note, setNote] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Join a room
  const joinRoom = (roomId) => {
    setRoom(roomId);
    socket.emit("joinRoom", roomId);
  };

  // Listen for real-time updates
  useEffect(() => {
    socket.on("loadNote", (content) => setNote(content));
    socket.on("noteUpdated", (content) => setNote(content));
    socket.on("notification", (msg) => setNotifications((prev) => [...prev, msg]));

    return () => {
      socket.off("loadNote");
      socket.off("noteUpdated");
      socket.off("notification");
    };
  }, []);

  // Update note content
  const updateNote = (newContent) => {
    setNote(newContent);
    socket.emit("editNote", { room, content: newContent });
  };

  return (
    <NotesContext.Provider value={{ room, note, updateNote, notifications, joinRoom }}>
      {children}
    </NotesContext.Provider>
  );
};

// Custom Hook
export const useNotes = () => {
  return useContext(NotesContext);
};
