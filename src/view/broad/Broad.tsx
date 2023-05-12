import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

import { useState, useEffect } from "react";

import {
  WhiteChessLocation,
  BlackChessLocation,
  pieceMapping,
  PieceName,
} from "../../control/utility/GameData";

import { color } from "../../control/utility/GameData";
import { useDispatch } from "react-redux";
import { locationSlice } from "../../store/gameState";

import PawnPromo from "./utility/PawnPromo";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Broad: React.FC = () => {
  const [cells, setCells] = useState<JSX.Element[]>([]);
  const site = useSelector((state: RootState) => state.location.site);
  const [showPawnPromo, setPawnPromo] = useState<{
    show: boolean;
    id: number;
    pcolor: color;
  }>({ show: false, id: -1, pcolor: color.Black });
  const [promoName, setPromoName] = useState<PieceName>(PieceName.Pawn);
  const dispatch = useDispatch();
  const handleShowPawnPromo = (id: number, pcolor: color) => {
    setPawnPromo((prev) => {
      return { show: !prev.show, id, pcolor };
    });
  };
  const handleSetPromoName = (name: PieceName) => {
    setPromoName(name);
    setPawnPromo((prev) => {
      return { ...prev, show: false };
    });
  };

  //Pawn promotion
  useEffect(() => {
    const pieceComponent = React.createElement(
      pieceMapping[promoName as PieceName],
      {
        removefromCell: removefromCell,
        addToCell: addToCell,
        currentId: showPawnPromo.id,
        setCellAttackMove: setCellAttackMove,
        setCellMovable: setCellMovable,
        handleShowPawnPromo: handleShowPawnPromo,
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
  }, [dispatch, promoName, showPawnPromo.id, showPawnPromo.pcolor]);

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
    const chessLoc =
      site == color.Black ? BlackChessLocation : WhiteChessLocation;

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
          }
        );
        addToCell(id, pieceComponent);
      }
    }
  }, [site, dispatch]);

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
    setCells((prevCell) => {
      const newCells = [...prevCell];
      const index = newCells.findIndex((cell) => cell.props.id == id);
      newCells[index] = <Cell key={id} id={id}></Cell>;
      return [...newCells];
    });
  };

  return (
    <>
      {showPawnPromo.show && (
        <PawnPromo
          handleSetPromoName={handleSetPromoName}
          pcolor={showPawnPromo.pcolor}
        ></PawnPromo>
      )}
      <Shape>{cells}</Shape>
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
