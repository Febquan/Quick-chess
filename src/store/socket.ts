import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";

interface initState {
  socket: Socket | undefined;
}

const initialState: initState = {
  socket: io(import.meta.env.VITE_BACK_END_URL),
};

const SocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {},
});

export { SocketSlice };
export default SocketSlice.reducer;
