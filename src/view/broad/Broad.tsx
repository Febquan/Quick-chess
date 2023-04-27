import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

import { useState, useEffect } from "react";

import {
  WhiteChessLocation,
  BlackChessLocation,
  pieceMapping,
} from "../utility/PieceLocation";

enum color {
  Black,
  White,
}

const Broad: React.FC = () => {
  const [cells, setCells] = useState<JSX.Element[]>([]);
  const [site, setSite] = useState<color>(color.Black);
  useEffect(() => {
    //draw cells
    const newCells = [];
    for (let i = 1; i <= 64; i++) {
      newCells.push(<Cell key={i} id={i}></Cell>);
    }
    setCells([...newCells]);

    // add full broad
    if (site == color.Black) {
      for (const piece of BlackChessLocation) {
        for (const id of piece.loc) {
          const pieceComponent = React.createElement(pieceMapping[piece.name], {
            removefromCell: removefromCell,
            addToCell: addToCell,
            currentId: id,
          });
          addToCell(id, pieceComponent);
        }
      }
    }
  }, [site]);

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
