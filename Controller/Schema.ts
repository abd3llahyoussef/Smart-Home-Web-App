import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

interface data extends mongoose.Document {
  type: string;
  value: number;
}

const smartHome = new mongoose.Schema<data>({
  type: { type: String, required: true },
  value: { type: Number, required: true },
});

export const SmartHome = mongoose.model<data>("SmartHome", smartHome);
