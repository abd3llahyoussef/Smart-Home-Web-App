import { createSlice } from "@reduxjs/toolkit";

interface data {
  type: string;
  value: number;
}

interface State {
  data: data[];
}
const initialState: State = {
  data: [],
};

const WeatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeather: (state, action) => {
      state.data = action.payload;
      console.log(state.data);
    },
  },
});

export const { setWeather } = WeatherSlice.actions;
export default WeatherSlice.reducer;
