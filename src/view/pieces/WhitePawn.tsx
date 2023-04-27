import React from "react";
import styled from "styled-components";

import WhitePawnsvg from "../../assets/pieces/WhitePawn";
import Draggable from "../utility/Drag";

import { props } from "./types";
const WhitePawn: React.FC<props> = ({
  addToCell,
  removefromCell,
  currentId,
}: props) => {
  // const NewSelf = React.createElement(WhitePawn, {
  //   movePiece: movePiece,
  // });
  return (
    <Draggable
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
    >
      <Wrapper>
        <WhitePawnsvg></WhitePawnsvg>
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

export default WhitePawn;
