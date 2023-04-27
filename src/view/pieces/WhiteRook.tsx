import React from "react";
import styled from "styled-components";

import WhiteRooksvg from "../../assets/pieces/WhiteRook";
import Draggable from "../utility/Drag";

import { props } from "./types";
const WhiteRook: React.FC<props> = ({
  addToCell,
  removefromCell,
  currentId,
}: props) => {
  // const NewSelf = React.createElement(WhiteRook, {
  //   movePiece: movePiece,
  // });
  return (
    <Draggable
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
    >
      <Wrapper>
        <WhiteRooksvg></WhiteRooksvg>
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

export default WhiteRook;
