import React from "react";
import styled from "styled-components";

import Bishopsvg from "../../assets/pieces/bishop";
import Draggable from "../utility/Drag";
import { props } from "./types";

const Bishop: React.FC<props> = ({
  addToCell,
  removefromCell,
  currentId,
}: props) => {
  // const NewSelf = React.createElement(Bishop, {
  //   movePiece: movePiece,
  // });
  return (
    <Draggable
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
    >
      <Wrapper>
        <Bishopsvg></Bishopsvg>
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

export default Bishop;