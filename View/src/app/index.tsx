"use client";
import { io } from "socket.io-client";
import { ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { setWeather } from "./GobalRedux/storeSlice/Temp&HumiditySlice";

interface data {
  type: string;
  value: number;
}

interface light {
  value: ReactNode;
}
let socket = io("ws://localhost:6060", {
  reconnection: true,
  reconnectionDelay: 1000,
});
let dataValue = 0;
export default function SocketClient({ value }: light): ReactNode {
  const [data, setData] = useState<data>({ type: "", value: 0 });
  const [dataValue, setDataValue] = useState<ReactNode>(0);
  const dispatch = useDispatch<any>();
  console.log(value);

  socket.on("connect", () => {
    console.log("client connected");
    socket.emit("message", "Hello Server!");
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });

  socket.on("message", (data) => {
    console.log(data);
  });

  //send to server on sendData topic
  socket.on("sendData", async (data) => {
    console.log(data);
    await setData(data);
    dispatch(setWeather(data));
  });
  // send to server on sendData topic
  if (dataValue !== value) {
    socket.emit("getRequest", JSON.parse(`{"value":${value}}`));
    setDataValue(value);
  }
  return value;
}
