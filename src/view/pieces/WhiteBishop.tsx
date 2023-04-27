import React from "react";
import styled from "styled-components";

import WhiteBishopsvg from "../../assets/pieces/WhiteBishop";
import Draggable from "../utility/Drag";

import { props } from "./types";
const WhiteBishop: React.FC<props> = ({
  addToCell,
  removefromCell,
  currentId,
}: props) => {
  // const NewSelf = React.createElement(WhiteBishop, {
  //   movePiece: movePiece,
  // });
  return (
    <Draggable
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
    >
      <Wrapper>
        <WhiteBishopsvg></WhiteBishopsvg>
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
export default WhiteBishop;
