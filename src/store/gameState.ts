import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  BlackChessLocation,
  WhiteChessLocation,
} from "../control/utility/GameData";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { color, chessLocations, PieceName } from "../control/utility/GameData";

type updatePayload = {
  name: PieceName;
  pcolor: color;
  newLoc: number;
  oldLoc: number;
};

type addPayload = {
  name: PieceName;
  loc: number;
};
type removePayload = {
  Loc: number;
};

type initState = {
  site: color;
  allPieceLoc: chessLocations;
  time: number;
  plusTime: number;
  timeOut: number;
};

const initialState: initState = {
  site: color.Black,
  allPieceLoc: BlackChessLocation,
  time: 90,
  plusTime: 30,
  timeOut: 2,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setTime(state, action) {
      state.time = action.payload;
    },
    setPlusTime(state, action) {
      state.plusTime = action.payload;
    },
    setTimeOut(state, action) {
      state.timeOut = action.payload;
    },

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

      if (name == PieceName.Rook || name == PieceName.WhiteRook) {
        const index = state.allPieceLoc[name].firstMove?.indexOf(oldLoc);
        if (index != -1) {
          state.allPieceLoc[name].firstMove?.splice(index as number, 1);
        }
      }
    },
    addLoc(state, actions: PayloadAction<addPayload>) {
      const { name, loc } = actions.payload;
      state.allPieceLoc[name].loc.push(loc);
    },
    removeLoc(state, actions: PayloadAction<removePayload>) {
      const { Loc } = actions.payload;

      for (const name in state.allPieceLoc) {
        const index = state.allPieceLoc[name as PieceName].loc.indexOf(Loc);
        if (index != -1) {
          state.allPieceLoc[name as PieceName].loc.splice(index, 1);
          break;
        }
      }
    },
    addLocEnPassant(state, actions: PayloadAction<addPayload>) {
      const { name, loc } = actions.payload;
      state.allPieceLoc[name as PieceName].enpassant?.push(loc);
    },
    removeEnPassant(state, actions: PayloadAction<addPayload>) {
      const { name, loc } = actions.payload;
      console.log(name, loc);
      const index =
        state.allPieceLoc[name as PieceName].enpassant?.indexOf(loc);
      if (index != -1 && index != null) {
        state.allPieceLoc[name as PieceName].enpassant?.splice(index, 1);
      }
    },

    printLoc(state) {
      console.log("Current state:", JSON.parse(JSON.stringify(state)));
    },
  },
});

export { locationSlice };
export default locationSlice.reducer;
