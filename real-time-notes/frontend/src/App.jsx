import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home.jsx";
import NoteRoom from "../src/pages/NoteRoom.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/room/:roomId" element={<NoteRoom />} />
            </Routes>
        </Router>
    );
}

export default App;
