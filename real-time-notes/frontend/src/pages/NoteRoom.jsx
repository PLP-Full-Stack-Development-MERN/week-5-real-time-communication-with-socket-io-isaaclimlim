import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function NoteRoom() {
  const { roomId } = useParams();
  const [note, setNote] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("loadNote", (content) => setNote(content));
    socket.on("noteUpdated", (content) => setNote(content));
    socket.on("notification", (msg) => setNotifications((prev) => [...prev, msg]));

    return () => socket.off();
  }, [roomId]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setNote(newContent);
    socket.emit("editNote", { room: roomId, content: newContent });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Room: {roomId}</h2>
      <textarea
        className="w-3/4 h-64 p-3 border border-gray-700 rounded-md text-white"
        value={note}
        onChange={handleChange}
      />
      <div className="mt-4 w-3/4 bg-gray-800 p-4 rounded-md">
        <h4 className="text-lg font-semibold">Notifications:</h4>
        {notifications.map((msg, index) => (
          <p key={index} className="text-sm text-white">{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default NoteRoom;
