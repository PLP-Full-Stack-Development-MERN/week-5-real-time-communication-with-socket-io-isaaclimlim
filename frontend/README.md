# Real-Time Collaborative Notes

## 📌 Project Overview
The **Real-Time Collaborative Notes** application allows multiple users to create, edit, and view notes in real time. Users can join specific rooms to collaborate on a shared note, and changes are instantly reflected for all users in the room. The app is built using:

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Express.js + Socket.io + MongoDB
- **State Management**: React Context API

## 🚀 Features
- ✅ Join a specific "room" via a unique URL or code
- ✅ Real-time collaborative editing using WebSockets
- ✅ Persistent notes stored in MongoDB
- ✅ Notifications when a user joins or leaves a room
- ✅ Display a list of online users in each room (Coming Soon)

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/PLP-Full-Stack-Development-MERN/week-5-real-time-communication-with-socket-io-isaaclimlim.git
cd real-time-notes
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install
```

#### **Set Up Environment Variables**
Create a `.env` file inside the `backend` folder and add:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

#### **Run the Server**
```sh
node server.js
```
*(or use `nodemon server.js` for auto-restart during development)*

### **3️⃣ Frontend Setup**
```sh
cd ../frontend
npm install
```

#### **Start the React App**
```sh
npm run dev
```

The application will be available at `http://localhost:5173/`.

---

## ⚡ Real-Time Concepts Used

### 1️⃣ **WebSockets & Socket.io**
- **WebSockets** enable real-time, bidirectional communication between the server and clients.
- **Socket.io** simplifies WebSocket implementation, handling events like `connection`, `joinRoom`, `editNote`, and `disconnect`.

### 2️⃣ **Room-Based Communication**
- Users join a specific room using `socket.join(roomId)`, allowing isolated updates per room.
- Notes are stored uniquely per room in MongoDB.

### 3️⃣ **State Management with React Context API**
- Centralized state for managing notes, room details, and notifications.
- Global access to state ensures efficient UI updates.


