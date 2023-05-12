import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import LocReducer from "./gameState";
import UserReducer from "./userState";

const rootReducer = combineReducers({
  location: LocReducer,
  user: UserReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
