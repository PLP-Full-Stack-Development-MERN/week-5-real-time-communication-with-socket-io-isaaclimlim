import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

function NoteRoom() {
  const { roomId } = useParams();
  const { note, updateNote, notifications, joinRoom } = useNotes();

  useEffect(() => {
    joinRoom(roomId);
  }, [roomId, joinRoom]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Room: {roomId}</h2>
      <textarea
        className="w-3/4 h-64 p-3 border border-gray-700 rounded-md text-black"
        value={note}
        onChange={(e) => updateNote(e.target.value)}
      />
      <div className="mt-4 w-3/4 bg-gray-800 p-4 rounded-md">
        <h4 className="text-lg font-semibold">Notifications:</h4>
        {notifications.map((msg, index) => (
          <p key={index} className="text-sm text-gray-400">{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default NoteRoom;
