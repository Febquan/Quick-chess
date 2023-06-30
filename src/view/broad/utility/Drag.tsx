import React, { useState, useEffect, useRef, useCallback } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { GameState, locationSlice } from "../../../store/gameState";
import {
  PieceName,
  chessLocations,
  color,
} from "../../../control/utility/GameData";
import { props } from "../pieces/types";

import Pointer from "./Pointer";

import Rook from "../pieces/Rook";
import WhiteRook from "../pieces/WhiteRook";
import King from "../pieces/King";
import WhiteKing from "../pieces/WhiteKing";

import store from "../../../store/store";

const audio = new Audio("../../../sound/move-self.mp3");
import { isCheckMate } from "../../../control/pieceControl/kingControl";
import {
  coordinateToId,
  getBoardSize,
  idToCoordinate,
  isEnpassantAttack,
} from "./helper";

type DraggableProps = {
  children: React.ReactNode;
  name: PieceName;
  pcolor: color;
  firstMove?: boolean;
  checkAvailableMove: (
    allPieceLoc: chessLocations,
    currentId: number,
    pcolor: color,
    getPreMove: boolean,
    firstMove?: boolean,
    site?: color
  ) => {
    validMove: number[];
    atackMove: number[];
  };
  handleShowPawnPromo?: (id: number, pcolor: color) => void;
} & props;
let broadSize = 0;

const convertOffSetToCellId = (X: number, Y: number) => {
  const x = Math.floor((X / broadSize) * 8);
  const y = Math.floor((Y / broadSize) * 8);
  const cellId = y * 8 + x;
  return cellId;
};

const Draggable: React.FC<DraggableProps> = ({
  children,
  addToCell,
  removefromCell,
  currentId,
  name,
  pcolor,
  checkAvailableMove,
  setCellAttackMove,
  setCellMovable,
  handleShowPawnPromo,
  handleMakeMoveTimer,
}) => {
  const roomId = useSelector((state: RootState) => state.location.roomId);
  const gameState = useSelector((state: RootState) => state.location.gameState);
  const socket = useSelector((state: RootState) => state.socket.socket);
  const turn = useSelector((state: RootState) => state.location.turn);

  const allPieceLoc = useSelector(
    (state: RootState) => state.location.allPieceLoc
  );

  const site = useSelector((state: RootState) => state.location.site);
  const dispatch = useDispatch();
  const [dragDisplay, setDragDisplay] = useState<{
    validMove: number[];
    atackMove: number[];
  }>({
    validMove: [],
    atackMove: [],
  });
  const [isDragging, setIsDragging] = useState(false);
  const [pointerOffSet, setPointerOffSet] = useState({ x: 0, y: 0 });
  const [offSet, setOffSet] = useState({ x: 0, y: 0 });
  const [parentPosition, setParentPosition] = useState({ x: 0, y: 0 });
  const [rectPosition, setRectPosition] = useState({ x: 0, y: 0 });
  const myElementRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  function setInitPos() {
    if (myElementRef.current && myElementRef.current.offsetParent) {
      const { x, y } = myElementRef.current.getBoundingClientRect();
      const { x: px, y: py } =
        myElementRef.current.offsetParent.getBoundingClientRect();
      setParentPosition({ x: px, y: py });
      setOffSet({ x: x - px, y: y - py });
    }
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // console.log(turn, gameState);
    if (
      pcolor != site ||
      gameState == GameState.NOTREADY ||
      gameState == GameState.ENDGAME ||
      !turn
    ) {
      return;
    }
    setInitPos();
    const px = event.clientX - parentPosition.x - rectPosition.x;
    const py = event.clientY - parentPosition.y - rectPosition.y;
    setPointerOffSet({
      x: (Math.floor((px / broadSize) * 8) * broadSize) / 8,
      y: (Math.floor((py / broadSize) * 8) * broadSize) / 8,
    });
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseXInRect = event.clientX - rect.left;
    const mouseyInRect = event.clientY - rect.top;
    setRectPosition({ x: mouseXInRect, y: mouseyInRect });
    setIsDragging(true);
    const firstMove = allPieceLoc[name].firstMove?.includes(currentId);
    // console.log(name, firstMove, allPieceLoc[name].firstMove);
    const { validMove, atackMove } = checkAvailableMove(
      allPieceLoc,
      currentId,
      pcolor,
      false,
      firstMove,
      site
    );
    setDragDisplay({ validMove, atackMove });
    setCellAttackMove(atackMove, true);
    setCellMovable(validMove, true);
  };
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        const px = event.clientX - parentPosition.x - rectPosition.x;
        const py = event.clientY - parentPosition.y - rectPosition.y;
        setOffSet({
          x: px,
          y: py,
        });
        setPointerOffSet({
          x: (Math.floor((px / broadSize) * 8) * broadSize) / 8,
          y: (Math.floor((py / broadSize) * 8) * broadSize) / 8,
        });
      }
    },
    [
      isDragging,
      parentPosition.x,
      parentPosition.y,
      rectPosition.x,
      rectPosition.y,
    ]
  );

  const movePiece = useCallback(
    (cellId: number, atackMove: number[]) => {
      removefromCell(currentId);
      addToCell(
        cellId,
        <Draggable
          name={name}
          pcolor={pcolor}
          removefromCell={removefromCell}
          addToCell={addToCell}
          currentId={cellId}
          checkAvailableMove={checkAvailableMove}
          setCellAttackMove={setCellAttackMove}
          setCellMovable={setCellMovable}
          firstMove={false}
          handleShowPawnPromo={
            name == PieceName.Pawn || name == PieceName.WhitePawn
              ? handleShowPawnPromo
              : undefined
          }
          handleMakeMoveTimer={handleMakeMoveTimer}
        >
          {children}
        </Draggable>
      );
      audio.play();
      if (atackMove.includes(cellId)) {
        dispatch(
          locationSlice.actions.removeLoc({
            Loc: cellId,
          })
        );
      }
      dispatch(
        locationSlice.actions.updateLoc({
          name,
          pcolor,
          newLoc: cellId,
          oldLoc: currentId,
        })
      );
    },
    [
      addToCell,
      checkAvailableMove,
      children,
      currentId,
      dispatch,
      handleMakeMoveTimer,
      handleShowPawnPromo,
      name,
      pcolor,
      removefromCell,
      setCellAttackMove,
      setCellMovable,
    ]
  );

  const NhapThanh = useCallback(
    (currentId: number, cellId: number, rookName: PieceName, pcolor: color) => {
      //nhap thanh
      const kingName =
        pcolor == color.Black ? PieceName.King : PieceName.WhiteKing;
      const { x, y } = idToCoordinate(currentId);
      const { x: xRook } = idToCoordinate(cellId);
      let rookId, kingId;
      if (xRook <= 4) {
        // nhap thanh trai
        rookId = coordinateToId(x - 1, y);
        kingId = coordinateToId(x - 2, y);
      } else {
        // nhap thanh phai
        rookId = coordinateToId(x + 1, y);
        kingId = coordinateToId(x + 2, y);
      }

      const htmlRook =
        pcolor == color.Black ? (
          <Rook
            addToCell={addToCell}
            removefromCell={removefromCell}
            setCellAttackMove={setCellAttackMove}
            setCellMovable={setCellMovable}
            currentId={rookId}
            firstMove={false}
            handleMakeMoveTimer={handleMakeMoveTimer}
          ></Rook>
        ) : (
          <WhiteRook
            addToCell={addToCell}
            removefromCell={removefromCell}
            setCellAttackMove={setCellAttackMove}
            setCellMovable={setCellMovable}
            currentId={rookId}
            firstMove={false}
            handleMakeMoveTimer={handleMakeMoveTimer}
          ></WhiteRook>
        );
      removefromCell(cellId);
      addToCell(rookId, htmlRook);

      dispatch(
        locationSlice.actions.updateLoc({
          name: rookName,
          pcolor,
          newLoc: rookId,
          oldLoc: cellId,
        })
      );

      //King
      const htmlKing =
        pcolor == color.Black ? (
          <King
            addToCell={addToCell}
            removefromCell={removefromCell}
            setCellAttackMove={setCellAttackMove}
            setCellMovable={setCellMovable}
            currentId={kingId}
            firstMove={false}
            handleMakeMoveTimer={handleMakeMoveTimer}
          ></King>
        ) : (
          <WhiteKing
            addToCell={addToCell}
            removefromCell={removefromCell}
            setCellAttackMove={setCellAttackMove}
            setCellMovable={setCellMovable}
            currentId={kingId}
            firstMove={false}
            handleMakeMoveTimer={handleMakeMoveTimer}
          ></WhiteKing>
        );
      removefromCell(currentId);

      addToCell(kingId, htmlKing);
      audio.play();
      dispatch(
        locationSlice.actions.updateLoc({
          name: kingName,
          pcolor,
          newLoc: kingId,
          oldLoc: currentId,
        })
      );
    },
    [
      addToCell,
      dispatch,
      handleMakeMoveTimer,
      removefromCell,
      setCellAttackMove,
      setCellMovable,
    ]
  );

  const handleMakeMoveSocket = useCallback(
    (cellId: number) => {
      if (gameState != GameState.INGAME) return;
      socket?.emit(
        "MakeMove",
        store.getState().location.allPieceLoc,
        roomId,
        name,
        cellId
      );
      console.log(
        "mad",
        isCheckMate(store.getState().location.allPieceLoc, site)
      );
      dispatch(
        locationSlice.actions.setCheckMate(
          isCheckMate(store.getState().location.allPieceLoc, site)
        )
      );
      dispatch(locationSlice.actions.setTurn(false));
      handleMakeMoveTimer();
    },
    [dispatch, gameState, handleMakeMoveTimer, name, roomId, site, socket]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging == false) return;
    const { validMove, atackMove } = dragDisplay;
    const cellId = convertOffSetToCellId(offSet.x, offSet.y);

    const rookName =
      pcolor == color.Black ? PieceName.Rook : PieceName.WhiteRook;
    if (
      (name == PieceName.King || name == PieceName.WhiteKing) &&
      allPieceLoc[rookName].firstMove?.includes(cellId) &&
      atackMove.includes(cellId)
    ) {
      NhapThanh(currentId, cellId, rookName, pcolor);
      handleMakeMoveSocket(cellId);
    } else {
      if (validMove.includes(cellId) || atackMove.includes(cellId)) {
        movePiece(cellId, atackMove);

        //PAWN PROMOTE

        if (
          (name == PieceName.Pawn || name == PieceName.WhitePawn) &&
          Math.floor(cellId / 8) == 0 &&
          handleShowPawnPromo
        ) {
          handleShowPawnPromo(cellId, pcolor);
          return;
        }
        //EN PASSANT
        const { y: y1, x: x1 } = idToCoordinate(currentId);
        const { y: y2, x: x2 } = idToCoordinate(cellId);
        const firstMove = allPieceLoc[name].firstMove?.includes(currentId);
        if (name == PieceName.Pawn || name == PieceName.WhitePawn) {
          if (!firstMove) {
            if (atackMove.includes(cellId)) {
              if (isEnpassantAttack(cellId, allPieceLoc, pcolor)) {
                removefromCell(coordinateToId(x2, y2 + 1));
                dispatch(
                  locationSlice.actions.removeEnPassant({
                    name:
                      name == PieceName.Pawn
                        ? PieceName.WhitePawn
                        : PieceName.Pawn,
                    loc: coordinateToId(x2, y2),
                  })
                );
                dispatch(
                  locationSlice.actions.removeLoc({
                    Loc: coordinateToId(x2, y2 + 1),
                  })
                );
              }
            }
            dispatch(
              locationSlice.actions.removeEnPassant({
                name,
                loc: coordinateToId(x1, y1 + 1),
              })
            );
          }
          if (firstMove && Math.abs(y1 - y2) == 2) {
            dispatch(
              locationSlice.actions.addLocEnPassant({
                name,
                loc: coordinateToId(x1, (y1 + y2) / 2),
              })
            );
          }
        }
        handleMakeMoveSocket(cellId);
      }
    }
    // dispatch(locationSlice.actions.printLoc());
    setCellMovable(validMove, false);
    setCellAttackMove(atackMove, false);
    setIsDragging(false);
  }, [
    NhapThanh,
    allPieceLoc,
    currentId,
    dispatch,
    dragDisplay,
    handleMakeMoveSocket,
    handleShowPawnPromo,
    isDragging,
    movePiece,
    name,
    offSet.x,
    offSet.y,
    pcolor,
    removefromCell,
    setCellAttackMove,
    setCellMovable,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // empty dependency array ensures the effect only runs once

  useEffect(() => {
    setInitPos();

    broadSize = getBoardSize();
  }, [windowSize]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    handleMouseUp,
    isDragging,
    parentPosition,
    rectPosition,
    handleMouseMove,
  ]);

  return (
    <>
      <div
        ref={myElementRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          position: isDragging ? "absolute" : "static",
          left: offSet.x,
          top: offSet.y,
          height: "var(--piece-size)",
          width: "var(--piece-size)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "grab",
          zIndex: 3,
        }}
      >
        {children}
      </div>
      {isDragging && <Pointer pos={pointerOffSet} />}
    </>
  );
};

export default Draggable;
