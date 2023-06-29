import { createSlice } from "@reduxjs/toolkit";
type initState = {
  name: string;
  elo: number;
  isLogin: boolean;
  token: string;
};
const initialState: initState = {
  name: "",
  elo: 0,
  isLogin: false,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.isLogin = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    addElo(state, action) {
      state.elo = state.elo + action.payload;
    },
    setElo(state, action) {
      state.elo = action.payload;
    },
  },
});

export { userSlice };
export default userSlice.reducer;
