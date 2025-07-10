import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import patientRouter from './routes/patient.routes.js';
import cors from 'cors';
import http from 'http';

import { Server } from "socket.io";

const app = express();

app.use(cors());

app.use(express.json());

const server = http.createServer(app);


const io = new Server(server, {
  cors: { origin: '*' }
});

io.on("connection", (socket) => {
  console.log('User connected:', socket.id);

   socket.on("status-updated", (data) => {
    console.log("Received status update from client", data);

    io.emit("status-updated", data);
  });
  
    socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

});


app.use('/patient' , patientRouter)
app.use('/api' , patientRouter)

const startServer = async () => {
    await connectDB()
    server.listen(process.env.PORT , () => console.log("Server Running successful✅" ))
};

startServer();