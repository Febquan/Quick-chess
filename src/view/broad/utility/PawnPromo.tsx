import React from "react";
import styled from "styled-components";

import Rook from "../../../assets/pieces/Rook";
import WhiteRook from "../../../assets/pieces/WhiteRook";
import Bishop from "../../../assets/pieces/bishop";
import WhiteBishop from "../../../assets/pieces/WhiteBishop";
import Queen from "../../../assets/pieces/Queen";
import WhiteQueen from "../../../assets/pieces/WhiteQueen";
import Knight from "../../../assets/pieces/Knight";
import WhiteKnight from "../../../assets/pieces/WhiteKnight";

import { color, PieceName } from "../../../control/utility/GameData";
import { pieceMapping } from "../../../control/utility/GameData";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { locationSlice } from "../../../store/gameState";
import { GameState } from "../../../store/gameState";
import store from "../../../store/store";
type props = {
  pcolor: color;
  removefromCell: (id: number) => void;
  addToCell: (id: number, piece: JSX.Element) => void;
  setCellAttackMove: (id: number[], setVal: boolean) => void;
  setCellMovable: (id: number[], setVal: boolean) => void;
  handleShowPawnPromo: (id: number, pcolor: color) => void;
  showPawnPromo: {
    show: boolean;
    id: number;
    pcolor: color;
  };
  handleMakeMoveTimer: VoidFunction;
};
const PawnPromo: React.FC<props> = ({
  pcolor,
  removefromCell,
  addToCell,
  setCellAttackMove,
  setCellMovable,
  showPawnPromo,
  handleShowPawnPromo,
  handleMakeMoveTimer,
}) => {
  const socket = useSelector((state: RootState) => state.socket.socket);
  const gameState = useSelector((state: RootState) => state.location.gameState);
  const dispatch = useDispatch();
  const roomId = useSelector((state: RootState) => state.location.roomId);
  const handleOnClick = (promoName: PieceName) => {
    const pieceComponent = React.createElement(
      pieceMapping[promoName as PieceName],
      {
        removefromCell: removefromCell,
        addToCell: addToCell,
        currentId: showPawnPromo.id,
        setCellAttackMove: setCellAttackMove,
        setCellMovable: setCellMovable,
        handleShowPawnPromo: handleShowPawnPromo,
        handleMakeMoveTimer: handleMakeMoveTimer,
      }
    );

    addToCell(showPawnPromo.id, pieceComponent);
    dispatch(locationSlice.actions.removeLoc({ Loc: showPawnPromo.id }));
    dispatch(
      locationSlice.actions.addLoc({
        name: promoName,
        loc: showPawnPromo.id,
      })
    );
    handleShowPawnPromo(showPawnPromo.id, pcolor);
    if (gameState != GameState.INGAME) return;
    // console.log("MAKEMOVE");
    socket?.emit("MakeMove", store.getState().location.allPieceLoc, roomId);
    handleMakeMoveTimer();
    dispatch(locationSlice.actions.setTurn(false));
  };

  const black = [
    <Rook
      key={1}
      onClick={() => {
        handleOnClick(PieceName.Rook);
      }}
    />,
    <Queen
      key={2}
      onClick={() => {
        handleOnClick(PieceName.Queen);
      }}
    />,
    <Bishop
      key={3}
      onClick={() => {
        handleOnClick(PieceName.Bishop);
      }}
    />,
    <Knight
      key={4}
      onClick={() => {
        handleOnClick(PieceName.Knight);
      }}
    />,
  ];
  const white = [
    <WhiteRook
      key={1}
      onClick={() => {
        handleOnClick(PieceName.WhiteRook);
      }}
    />,
    <WhiteQueen
      key={2}
      onClick={() => {
        handleOnClick(PieceName.WhiteQueen);
      }}
    />,
    <WhiteBishop
      key={3}
      onClick={() => {
        handleOnClick(PieceName.WhiteBishop);
      }}
    />,
    <WhiteKnight
      key={4}
      onClick={() => {
        handleOnClick(PieceName.WhiteKnight);
      }}
    />,
  ];
  return (
    <BackDrop>
      <div>
        <List>{pcolor == color.Black ? black : white}</List>
      </div>
    </BackDrop>
  );
};

const BackDrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: #05050598;
  z-index: 100;
  transition: all 0.4ms;
`;
const List = styled.li`
  border-radius: 5px;
  background-color: #d0d0d0;
  padding: 20px;
  width: fit-content;
  height: 120px;
  display: flex;
  flex-direction: row;
  gap: 40px;
`;
export default PawnPromo;
