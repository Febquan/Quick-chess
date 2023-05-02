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
import { locationSlice } from "../../control/gameState";

const Broad: React.FC = () => {
  const [cells, setCells] = useState<JSX.Element[]>([]);
  const [site, setSite] = useState<color>(color.Black);
  const dispatch = useDispatch();

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
    dispatch(locationSlice.actions.setPlaySite(site));
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
      <Shape>{cells}</Shape>
      <button
        onClick={() => setSite(site == color.Black ? color.White : color.Black)}
      >
        set
      </button>
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
`;

export default Broad;
