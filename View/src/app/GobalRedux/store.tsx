import { configureStore } from "@reduxjs/toolkit";
import WeatherReducer from "./storeSlice/Temp&HumiditySlice";

export const store = configureStore({
  reducer: {
    tempAndHumidity: WeatherReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
