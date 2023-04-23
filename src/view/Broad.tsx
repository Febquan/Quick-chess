import React from "react";
import styled from "styled-components";
import Cell from "./Cell";
import Pawn from "./pieces/Pawn";
import { useState, useEffect } from "react";
const Broad: React.FC = () => {
  const [cells, setCells] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newCells = [];
    for (let i = 1; i <= 64; i++) {
      if (i == 3 || i == 4) {
        newCells.push(
          <Cell key={i} id={i}>
            <Pawn></Pawn>
          </Cell>
        );
        continue;
      }
      newCells.push(<Cell key={i} id={i}></Cell>);
    }
    setCells(newCells);
  }, []);

  // const addToCell = (id: number, piece: JSX.Element) => {
  //   const newCells = cells;
  //   const index = newCells.findIndex((cell) => cell.props.id == id);
  //   newCells[index] = (
  //     <Cell key={index + 1} id={index + 1} >
  //       {piece}
  //     </Cell>
  //   );
  //   setCells([...newCells]);
  // };

  return (
    <>
      <Shape>{cells}</Shape>
      {/* <button onClick={() => addToCell(3, <Pawn />)}>Add Pawn to Cell 3</button> */}
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
`;

export default Broad;
