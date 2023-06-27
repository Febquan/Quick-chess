import { createSlice } from "@reduxjs/toolkit";
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
  timeOutTime: number;
  gameState: GameState;
  turn: boolean;
  isTimeOut: boolean;
  isChecked: boolean;
  check: boolean;
  roomId?: string;
};

export enum GameState {
  FINDGAME,
  NOTREADY,
  READY,
  INGAME,
  TIMEOUT,
  ENDGAME,
}
export const initialState: initState = {
  site: color.White,
  allPieceLoc: WhiteChessLocation,
  time: 0.1,
  plusTime: 30,
  timeOutTime: 3, //min
  timeOut: 2,
  gameState: GameState.FINDGAME,
  turn: false,
  isTimeOut: false,
  roomId: undefined,
  isChecked: false,
  check: false,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setGameState(state, action: PayloadAction<GameState>) {
      state.gameState = action.payload;
    },
    setCheckMate(
      state,
      action: PayloadAction<{ check: boolean; isChecked: boolean }>
    ) {
      state.check = action.payload.check;
      state.isChecked = action.payload.isChecked;
    },
    setTime(state, action) {
      state.time = action.payload;
    },
    setRoomId(state, action) {
      state.roomId = action.payload;
    },
    setPlusTime(state, action) {
      state.plusTime = action.payload;
    },
    setTimeOut(state, action) {
      state.timeOut = action.payload;
    },
    afterUseTimeOut(state) {
      state.timeOut = state.timeOut - 1;
    },
    setTurn(state, action) {
      state.turn = action.payload;
    },
    setShowTimeOut(state, action) {
      state.isTimeOut = action.payload;
    },
    setPlaySite(state, action) {
      const siteColor: color = action.payload;
      state.allPieceLoc =
        siteColor == color.Black ? BlackChessLocation : WhiteChessLocation;
      state.site = siteColor;
    },
    resetLoc(state, actions) {
      state.allPieceLoc =
        actions.payload == color.Black
          ? BlackChessLocation
          : WhiteChessLocation;
    },
    renderGivenLoc(state, actions) {
      state.allPieceLoc = actions.payload;
    },
    updateLoc(state, actions: PayloadAction<updatePayload>) {
      const { name, newLoc, oldLoc } = actions.payload;
      const index = state.allPieceLoc[name].loc.findIndex((id) => id == oldLoc);
      state.allPieceLoc[name].loc[index] = newLoc;

      if (
        name == PieceName.Rook ||
        name == PieceName.WhiteRook ||
        name == PieceName.Pawn ||
        name == PieceName.WhitePawn ||
        name == PieceName.WhiteKing ||
        name == PieceName.King
      ) {
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
      const index =
        state.allPieceLoc[name as PieceName].enpassant?.indexOf(loc);
      if (index != -1 && index != null) {
        state.allPieceLoc[name as PieceName].enpassant?.splice(index, 1);
      }
    },

    // printLoc(state) {
    //   console.log("Current state:", JSON.parse(JSON.stringify(state)));
    // },
  },
});

export { locationSlice };
export default locationSlice.reducer;
