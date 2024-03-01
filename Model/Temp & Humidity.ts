import { SmartHome } from "../Controller/Schema";

interface data {
  type: string;
  value: number;
}
//Store the Temperature and Humidity Data
export class smartHomeSystem {
  async tempAndHumidity(type: string, value: number): Promise<data> {
    try {
      const smart = new SmartHome({ type, value });
      await smart.save().then(() => console.log("Saved Successfully!!!"));
      return { type, value };
    } catch (err) {
      throw err;
    }
  }
}
