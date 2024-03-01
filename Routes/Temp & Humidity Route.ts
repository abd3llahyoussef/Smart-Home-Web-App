import express, { Request, Response } from "express";
import { smartHomeSystem } from "../Model/Temp & Humidity";
import mqtt from "mqtt";
import dotenv from "dotenv";

interface data {
  type: string;
  value: number;
}

dotenv.config();
//mqtt Configurations
const options: mqtt.IClientOptions = {
  host: process.env.HOST!,
  port: Number(process.env.PORT!),
  protocol: "mqtts",
  username: process.env.USERNAME!,
  password: process.env.PASSWORD!,
};
const client = mqtt.connect(options);

const saveTempAndHumidity = async (req: Request, res: Response) => {
  try {
    client.on("message", async (topic: string, message: Buffer) => {
      console.log(
        "Received MSG FROM the Broker",
        topic.toString(),
        message.toString()
      );
    });
  } catch (err) {
    res.send("Error While insert data").sendStatus(500);
  }
};

// client.on("connect", async () => {
//   console.log("Connected to MQTT broker");
//   client.subscribe("SendingData");
// });

export const Temp_Humidity = (app: express.Application) => {
  app.get("/tempAndHumidity", saveTempAndHumidity);
};
