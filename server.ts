import express, { Request, Response } from "express";
import mqtt from "mqtt";
import dotenv from "dotenv";
import cors from "cors";
import { SmartHome } from "./Controller/Schema";
import mongoose from "mongoose";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

interface data {
  type: string;
  value: number;
}

const ws_topic_send: string = "sendData";
const topic_publish: string = "getingRequest";
const topic_subscribe: string = "sendingData";
const ws_topic_receive: string = "getRequest";

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const server = http.createServer(app);
//const server = "0.0.0.0:6060";
const MongoURL = process.env.MONGO_URL!;
const io = new SocketIOServer(server, {
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});

//Socket.io Connection
io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  // Send data to the front end
  socket.emit("message", "Hello from the server");
  socket.on(ws_topic_receive, (msg) => {
    console.log(`this is the received data:${msg}`);
    sendToDevice(topic_publish, msg);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(6060, () => {
  console.log(`Server is running on :6060`);
  //mongo Connection
  mongoose
    .connect(MongoURL)
    .then(() => console.log("Connected to DataBase!!!"));
  //Mqtt broker Connection
  client.on("connect", async () => {
    console.log("Connected to MQTT broker");
    if (await client.subscribe(topic_subscribe)) {
      console.log("subscribed!!!");
    }
  });
});

dotenv.config();
//mqtt Configurations
const options: mqtt.IClientOptions = {
  host: process.env.HOST!,
  port: Number(process.env.PORT!),
  protocol: "mqtts",
  username: "abdallah",
  password: process.env.PASSWORD!,
};
const client = mqtt.connect(options);

client.on("message", async (topic, message) => {
  console.log(
    "Received MSG FROM the Broker",
    topic.toString(),
    message.toString()
  );
  const msg = JSON.parse(message.toString());
  //await tempAndHumidity(msg);
  await setInterval(() => sendToApplication(ws_topic_send, msg), 5000);
});

//save temp & humidity in DB
const tempAndHumidity = async (data: data) => {
  try {
    const smart = new SmartHome(data);
    await smart.save().then(() => console.log("Saved Successfully!!!"));
  } catch (err) {
    throw err;
  }
};

//send recieved data to FrontEnd
const sendToApplication = async (topic: string, data: data) => {
  io.emit(topic, data);
};

//send Message to the broker
const sendToDevice = async (topic: string, data: Buffer) => {
  console.log(data);
  await client.publish(topic, JSON.stringify(data));
};

export default app;
