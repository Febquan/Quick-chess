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
      newCells.push(<Cell key={i} id={i}></Cell>);
    }
    setCells([...newCells]);
  }, []);

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
      <button
        onClick={() => {
          addToCell(
            1,
            <Pawn
              removefromCell={removefromCell}
              addToCell={addToCell}
              currentId={1}
            />
          );
        }}
      ></button>
      <button
        onClick={() => {
          addToCell(
            2,
            <Pawn
              removefromCell={removefromCell}
              addToCell={addToCell}
              currentId={2}
            />
          );
        }}
      ></button>
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
  overflow: hidden;
  border-radius: 10px;
`;

export default Broad;
