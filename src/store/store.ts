import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import LocReducer from "./gameState";
import UserReducer from "./userState";
import SocketReducer from "./socket";

const rootReducer = combineReducers({
  location: LocReducer,
  user: UserReducer,
  socket: SocketReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
