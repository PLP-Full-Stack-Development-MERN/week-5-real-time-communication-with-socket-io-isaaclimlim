import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room.trim()) navigate(`/room/${room}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Real-Time Collaborative Notes</h1>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="p-3 border border-gray-700 rounded-md mb-4 text-black"
      />
      <button
        onClick={joinRoom}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Join Room
      </button>
    </div>
  );
}

export default Home;
