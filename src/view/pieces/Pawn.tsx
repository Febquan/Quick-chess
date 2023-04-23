import React from "react";
import styled from "styled-components";

import Pawnsvg from "../../assets/pieces/Pawn";
import Draggable from "./Drag";
const Pawn: React.FC = () => {
  return (
    <Draggable>
      <Wrapper>
        <Pawnsvg></Pawnsvg>
      </Wrapper>
    </Draggable>
  );
};

const Wrapper = styled.div`
  height: 30px;
  width: 30px;
`;

export default Pawn;
