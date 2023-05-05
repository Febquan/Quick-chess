import React from "react";
import styled from "styled-components";
type props = {
  cellSize: number;
};
const Movable: React.FC<props> = ({ cellSize }) => {
  return <Circle cellSize={cellSize}></Circle>;
};

const Circle = styled.div<props>`
  width: ${(props) => props.cellSize * 0.3}px;
  height: ${(props) => props.cellSize * 0.3}px;

  background-color: #5a5a5a;
  border-radius: 50%;
  opacity: 20%;
  position: absolute;
  transform: translateX(116%);
  z-index: 0;
`;
export default Movable;
