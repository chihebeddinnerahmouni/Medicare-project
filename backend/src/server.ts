import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import http from "http";
import socketIo from "socket.io";
import { Server } from "socket.io";
import { ioEvents } from "./ioEvents";
// import { GrantType, setupKinde } from "@kinde-oss/kinde-node-express"; 

dotenv.config();
const app = express();

// const config = {
//   clientId: "3680bc54eb3d4c1c8cc34f77404c29f1",
//   issuerBaseUrl: "https://medicareapp.kinde.com",
//   siteUrl: "http://localhost:3000",
//   secret: "tB9jwu1l6wWWyrcAaWrajWhrQYIxvuQ6LsuRXNNBqZ7Zx48a4G",
//   redirectUrl: "http://localhost:3000/kinde_callback",
//   grantType: GrantType.AUTHORIZATION_CODE,
//   unAuthorisedUrl: "http://localhost:3000",
//   postLogoutRedirectUrl: "http://localhost:3000",
// };
// setupKinde(config, app); // hado tajroubi brk 


const PORT = process.env.port;
const DB = process.env.MONGO_URI;
console.log(DB);

// to use
app.use(express.text()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // replace with the client's origin
    credentials: true,
  })
);
app.use("/assets", express.static(path.join(__dirname, "./assets")));
//security
//rate limiter
/*app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);*/
//helmet
/*app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
    },
  })
);
//helmet.js
app.use(helmet());
//cors
const corsOptions = {
  origin: "http://your-trusted-domain.com",
};

app.use(cors(corsOptions));*/

//routes
// app.use("/admins", require("./routes/admin-routes"));
// app.use("/doctors", require("./routes/doctors-routes"));
app.use("/pharmacies", require("./server/modules/pharmacy/pharmacies-routes"));
app.use("/patients", require("./server/modules/user/user-routes"));
app.use("/nurses", require("./server/modules/nurse/nurse-routes"));
// app.use("/", (req, res) => { res.send("Welcome to the backend"); });

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow GET and POST requests
  },
});

io.on("connection", (socket) => {
  // console.log("User connected");
  ioEvents(io, socket);
});

//connect to database
mongoose.connect(DB!)
  .then(async () => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));











//delete unique index
/*mongoose.connection.collections["patients"]
      .dropIndex("name_1")
      .then(() => {
          console.log('Dropped index');
      })
      .catch((err) => {
          console.log('Failed to drop index:', err);
      });*/

//check indexes
/*const indexes = await nurseModel.collection.getIndexes();
        console.log(indexes);*/
