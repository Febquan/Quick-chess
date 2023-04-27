import React from "react";
import styled from "styled-components";

import Pawnsvg from "../../assets/pieces/Pawn";
import Draggable from "./Drag";

type props = {
  addToCell: (addId: number, piece: JSX.Element) => void;
  removefromCell: (id: number) => void;
  currentId: number;
};
const Pawn: React.FC<props> = ({
  addToCell,
  removefromCell,
  currentId,
}: props) => {
  // const NewSelf = React.createElement(Pawn, {
  //   movePiece: movePiece,
  // });
  return (
    <Draggable
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
    >
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
