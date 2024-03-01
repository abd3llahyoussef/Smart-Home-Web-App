"use client";
import Image from "next/image";
import SocketClient from "./index";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import temp from "../../public/temp.png";
import humidity from "../../public/hum.png";
import bulbOn from "../../public/bulb-on.png";
import bulbOff from "../../public/bulb-off.png";
export default function Home() {
  const [data, setData] = useState<number>(0);
  const info = useSelector((state: any) => state.tempAndHumidity.data);
  const [tempData, setTempData] = useState<number>(0);
  const [humidityData, setHumidityData] = useState<number>(0);
  useEffect(() => {
    if (info.type === "Temp") {
      setTempData(info.value);
    } else if (info.type === "Humidity") {
      setHumidityData(info.value);
    }
  }, [info]);
  const handleLights = async () => {
    console.log(data);
    const newData = data === 0 ? 1 : 0;
    console.log(data);
    await setData(newData);
    console.log(data);
  };
  return (
    <div className="grid grid-cols-1 h-screen place-items-center bg-white">
      <p className="text-black text-4xl">Smart Home</p>

      <div className="grid grid-cols-1 pt-2 border-2 border-black rounded-2xl shadow-2xl w-1/5 h-5/6 place-items-center">
        <Image src={temp} alt="Temperature" width="80" height="40" />
        <p className="text-black text-3xl">
          {tempData}
          <sup>o</sup>C
        </p> 
      </div>

      <div className="grid grid-cols-1 pt-2 border-2 border-black rounded-2xl shadow-2xl w-1/5 h-5/6 place-items-center">
        <Image src={humidity} alt="Humidity" width="80" height="40" />
        <p className="text-black text-3xl">{humidityData}%</p>
      </div>
      <div className="grid grid-cols-1  border-2 border-black rounded-2xl shadow-2xl w-1/5 h-5/6 place-items-center">
        <button onClick={handleLights}>
          {data == 1 ? (
            <Image src={bulbOn} alt="Turn on Light" width="70" height="70" />
          ) : (
            <Image src={bulbOff} alt="Turn off Light" width="70" height="70" />
          )}
        </button>
      </div>
      <SocketClient value={data} />
    </div>
  );
}
