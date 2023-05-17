import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface initState {
  socket: Socket | undefined;
}

const initialState: initState = {
  socket: undefined,
};

const SocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    initSocket(state, action) {
      state.socket = action.payload;
    },
  },
});

export { SocketSlice };
export default SocketSlice.reducer;
