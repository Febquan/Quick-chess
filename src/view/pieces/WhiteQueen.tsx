import React from "react";
import styled from "styled-components";

import WhiteQueensvg from "../../assets/pieces/WhiteQueen";
import Draggable from "../utility/Drag";

import { props } from "./types";
const WhiteQueen: React.FC<props> = ({
  addToCell,
  removefromCell,
  currentId,
}: props) => {
  // const NewSelf = React.createElement(WhiteQueen, {
  //   movePiece: movePiece,
  // });
  return (
    <Draggable
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
    >
      <Wrapper>
        <WhiteQueensvg></WhiteQueensvg>
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

export default WhiteQueen;
