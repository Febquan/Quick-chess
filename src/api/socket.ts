import { io, Socket } from "socket.io-client";

let Myconection: Socket;
export const MySocket = {
  async init(httpServer: string) {
    try {
      Myconection = await io(httpServer);
      return Myconection;
    } catch (err) {
      console.log(err);
    }
  },
  getConection(httpServer?: string) {
    if (Myconection) {
      return Myconection;
    } else {
      return MySocket.init(httpServer as string);
    }
  },
  getId() {
    if (Myconection) {
      return Myconection.id;
    }
    return null;
  },
};
