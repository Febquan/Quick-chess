import { configureStore, createSlice } from "@reduxjs/toolkit";
import { BlackChessLocation, WhiteChessLocation } from "./utility/GameData";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { color, chessLocations, PieceName } from "./utility/GameData";

type updatePayload = {
  name: PieceName;
  pcolor: color;
  newLoc: number;
  oldLoc: number;
};

type initState = {
  site: color;
  allPieceLoc: chessLocations;
};
const initialState: initState = {
  site: color.Black,
  allPieceLoc: BlackChessLocation,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setPlaySite(state, action) {
      const siteColor: color = action.payload;
      state.allPieceLoc =
        siteColor == color.Black ? BlackChessLocation : WhiteChessLocation;
      state.site = siteColor;
    },
    updateLoc(state, actions: PayloadAction<updatePayload>) {
      const { name, newLoc, oldLoc } = actions.payload;
      const index = state.allPieceLoc[name].loc.findIndex((id) => id == oldLoc);
      state.allPieceLoc[name].loc[index] = newLoc;
    },
    printLoc(state) {
      console.log("Current state:", JSON.parse(JSON.stringify(state)));
    },
  },
});

const store = configureStore({
  reducer: locationSlice.reducer,
});
export type RootState = ReturnType<typeof store.getState>;
export { locationSlice };
export default store;
