import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home.jsx";
import NoteRoom from "../src/pages/NoteRoom.jsx";
import { NotesProvider } from "../src/context/NotesContext.jsx"; // Correct import

function App() {
    return (
        <NotesProvider> {/* Wrap the app in the context provider */}
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/room/:roomId" element={<NoteRoom />} />
                </Routes>
            </Router>
        </NotesProvider>
    );
}

export default App;
