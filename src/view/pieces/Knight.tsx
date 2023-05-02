import React from "react";
import styled from "styled-components";

import Knightsvg from "../../assets/pieces/Knight";
import Draggable from "../utility/Drag";

import { props } from "./types";
import { PieceName, color } from "../../control/utility/GameData";
const Knight: React.FC<props> = ({
  addToCell,
  removefromCell,
  currentId,
}: props) => {
  const pcolor = color.Black;
  const name = PieceName.Knight;
  return (
    <Draggable
      name={name}
      pcolor={pcolor}
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
    >
      <Wrapper>
        <Knightsvg></Knightsvg>
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

export default Knight;
