require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const socket = require("socket.io");

const app = express();
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Ket noi den database
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Đã kết nối với MongoDB");
  }
);

app.use(express.json());
app.use(cors());
app.use("/api/user", require("./routes/authRouter"));
app.use("/api", require("./routes/postRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api/messages", require("./routes/messageRouter"));

const PORT = 5000;

const server = app.listen(PORT, () =>
  console.log(`Server đang chạy với cổng ${PORT}`)
);

// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });
