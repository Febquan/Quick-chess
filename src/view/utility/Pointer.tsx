import React from "react";
import styled from "styled-components";

type props = {
  pos: { x: number; y: number };
};
const Pointer: React.FC<props> = ({ pos }) => {
  return <Rec pos={pos}></Rec>;
};

const Rec = styled.div<props>`
  width: calc(var(--broad-size) / 8);
  height: calc(var(--broad-size) / 8);
  border: 5px solid #b4b4b4;

  position: absolute;
  left: ${(props) => props.pos.x}px;
  top: ${(props) => props.pos.y}px;
  z-index: 1;
`;
export default Pointer;
