import React from "react";
import styled from "styled-components";

import WhiteKnightsvg from "../../assets/pieces/WhiteKnight";
import Draggable from "../utility/Drag";

import { props } from "./types";
import { PieceName, color } from "../../control/utility/GameData";
const WhiteKnight: React.FC<props> = ({
  addToCell,
  removefromCell,
  currentId,
}: props) => {
  const pcolor = color.White;
  const name = PieceName.WhiteKnight;
  return (
    <Draggable
      name={name}
      pcolor={pcolor}
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
    >
      <Wrapper>
        <WhiteKnightsvg></WhiteKnightsvg>
      </Wrapper>
    </Draggable>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default WhiteKnight;
