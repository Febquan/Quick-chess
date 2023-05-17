import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

import { useState, useEffect, useCallback } from "react";

import { pieceMapping, PieceName } from "../../control/utility/GameData";

import { color } from "../../control/utility/GameData";
import { useDispatch } from "react-redux";

import PawnPromo from "./utility/PawnPromo";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TimeOutBackDrop from "./utility/TimeOutBackDrop";

import WinLoseBackDrop from "./utility/WinLoseBackDrop";
import { GameState, locationSlice } from "../../store/gameState";
import DrawBackDrop from "./utility/DrawBackDrop";
interface TimeRefType {
  addTime: () => void;
  pauseTime: () => void;
  resumeTime: () => void;
}
type props = {
  handleMakeMoveTimer: VoidFunction;
  handleTimeOutDone: VoidFunction;
  myTimer: React.RefObject<TimeRefType>;
  opponentTimer: React.RefObject<TimeRefType>;
};
const Broad: React.FC<props> = ({
  handleMakeMoveTimer,
  handleTimeOutDone,
  myTimer,
  opponentTimer,
}) => {
  const [cells, setCells] = useState<JSX.Element[]>([]);
  const [showGameResult, setShowGameResult] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const [showDraw, setShowDraw] = useState<boolean>(false);
  const site = useSelector((state: RootState) => state.location.site);
  const socket = useSelector((state: RootState) => state.socket.socket);
  const roomId = useSelector((state: RootState) => state.location.roomId);
  const [mess, setMess] = useState<string>("");
  const [drawMess, setDrawMess] = useState<string>("");
  const chessLoc = useSelector(
    (state: RootState) => state.location.allPieceLoc
  );
  const showTimeOut = useSelector(
    (state: RootState) => state.location.isTimeOut
  );
  const gameState = useSelector((state: RootState) => state.location.gameState);
  const [showPawnPromo, setPawnPromo] = useState<{
    show: boolean;
    id: number;
    pcolor: color;
  }>({ show: false, id: -1, pcolor: color.Black });

  const dispatch = useDispatch();
  const handleShowPawnPromo = (id: number, pcolor: color) => {
    setPawnPromo((prev) => {
      return { show: !prev.show, id, pcolor };
    });
  };
  const checkGameWin = useCallback(() => {
    const opponentKingName =
      site == color.Black ? PieceName.WhiteKing : PieceName.King;

    if (chessLoc[opponentKingName].loc.length == 0) {
      dispatch(locationSlice.actions.setGameState(GameState.ENDGAME));
      setWin(true);
      setShowGameResult(true);
      socket?.emit("IBeatYou", roomId);
      return;
    }
  }, [site, chessLoc, dispatch, socket, roomId]);
  useEffect(() => {
    //draw cells
    const newCells = [];
    for (let i = 0; i < 64; i++) {
      newCells.push(
        <Cell
          key={i}
          id={i}
          isAttackedCell={false}
          isMovableCell={false}
        ></Cell>
      );
    }
    setCells([...newCells]);

    // add full broad

    for (const name in chessLoc) {
      for (const id of chessLoc[name as PieceName].loc) {
        const pieceComponent = React.createElement(
          pieceMapping[name as PieceName],
          {
            removefromCell: removefromCell,
            addToCell: addToCell,
            currentId: id,
            setCellAttackMove: setCellAttackMove,
            setCellMovable: setCellMovable,
            handleShowPawnPromo: handleShowPawnPromo,
            handleMakeMoveTimer: handleMakeMoveTimer,
          }
        );
        addToCell(id, pieceComponent);
      }
    }
    checkGameWin();
  }, [site, dispatch, gameState, chessLoc, handleMakeMoveTimer, checkGameWin]);

  const addToCell = (id: number, piece: JSX.Element) => {
    setCells((prevCell) => {
      const newCells = [...prevCell];
      const index = newCells.findIndex((cell) => cell.props.id == id);
      newCells[index] = (
        <Cell key={id} id={id}>
          {piece}
        </Cell>
      );
      return [...newCells];
    });
  };

  const setCellAttackMove = (id: number[], setVal: boolean) => {
    setCells((prevCell) => {
      const newCells = [...prevCell];
      for (const i of id) {
        const index = newCells.findIndex((cell) => cell.props.id == i);
        newCells[index] = (
          <Cell
            key={i}
            id={i}
            {...newCells[index].props}
            isAttackedCell={setVal}
          ></Cell>
        );
      }
      return [...newCells];
    });
  };
  const setCellMovable = (id: number[], setVal: boolean) => {
    setCells((prevCell) => {
      const newCells = [...prevCell];
      for (const i of id) {
        const index = newCells.findIndex((cell) => cell.props.id == i);
        newCells[index] = (
          <Cell
            key={i}
            id={i}
            {...newCells[index].props}
            isMovableCell={setVal}
          ></Cell>
        );
      }
      return [...newCells];
    });
  };

  const removefromCell = (id: number) => {
    // console.log("remove", id);
    setCells((prevCell) => {
      const newCells = [...prevCell];
      const index = newCells.findIndex((cell) => cell.props.id == id);
      newCells[index] = <Cell key={id} id={id}></Cell>;
      return [...newCells];
    });
  };
  const continueAfterGame = () => {
    dispatch(locationSlice.actions.setGameState(GameState.NOTREADY));
    setShowGameResult(false);
    dispatch(locationSlice.actions.resetLoc(site));
    setMess("");
    setDrawMess("");
    setShowDraw(false);
  };
  const handleShowDraw = (show: boolean) => {
    setShowDraw(show);
  };

  useEffect(() => {
    socket?.on("YouLose", () => {
      setWin(false);
      setShowGameResult(true);

      dispatch(locationSlice.actions.setGameState(GameState.ENDGAME));
      return () => {
        socket.off("YouLose");
      };
    });
    socket?.on("EnemySurrender", (mess) => {
      setMess(mess);
      setWin(true);
      setShowGameResult(true);
      dispatch(locationSlice.actions.setGameState(GameState.ENDGAME));
      socket?.emit("IBeatYou", roomId);
    });
    socket?.on("OpponentCallDraw", () => {
      handleShowDraw(true);
      opponentTimer.current?.pauseTime();
      console.log("HELELLELE");
    });
    socket?.on("DeclineCallDraw", () => {
      handleShowDraw(true);
      setDrawMess("Decline !");
      myTimer.current?.resumeTime();
      setTimeout(() => {
        handleShowDraw(false);
      }, 1500);
    });
    socket?.on("AcceptCallDraw", () => {
      handleShowDraw(true);
      setDrawMess("Draw !");
    });
    return () => {
      socket?.off("YouLose");
      socket?.off("EnemySurrender");
    };
  }, [opponentTimer, dispatch, roomId, socket, myTimer]);

  return (
    <>
      <Shape>
        {cells}
        {showTimeOut && <TimeOutBackDrop handleExpire={handleTimeOutDone} />}
        {showPawnPromo.show && (
          <PawnPromo
            removefromCell={removefromCell}
            addToCell={addToCell}
            setCellAttackMove={setCellAttackMove}
            setCellMovable={setCellMovable}
            showPawnPromo={showPawnPromo}
            handleShowPawnPromo={handleShowPawnPromo}
            pcolor={site}
            handleMakeMoveTimer={handleMakeMoveTimer}
          ></PawnPromo>
        )}
        {showGameResult && (
          <WinLoseBackDrop
            win={win}
            continueAfterGame={continueAfterGame}
            mess={mess}
          />
        )}
        {showDraw && (
          <DrawBackDrop
            showDraw={handleShowDraw}
            drawMess={drawMess}
            setDrawMess={setDrawMess}
            continueAfterGame={continueAfterGame}
            myTimer={myTimer}
            opponentTimer={opponentTimer}
          ></DrawBackDrop>
        )}
      </Shape>
    </>
  );
};

const Shape = styled.div`
  width: var(--broad-size);
  height: var(--broad-size);
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-radius: 10px;

  box-shadow: 0px 0px 20px hsl(0deg 0% 0% / 0.2);
`;

export default Broad;
