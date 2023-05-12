import React from "react";
import styled from "styled-components";

type props = {
  cellSize: number;
};
const AttackMove: React.FC<props> = ({ cellSize }) => {
  return <Circle cellSize={cellSize}></Circle>;
};

const Circle = styled.div<props>`
  width: ${(props) => props.cellSize * 0.6}px;
  height: ${(props) => props.cellSize * 0.6}px;
  border: 5px solid red;
  opacity: 30%;
  border-radius: 50%;
  position: absolute;
  transform: translateX(33.3%);
  z-index: 0;
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    border: 3px solid red;
    transform: translateX(25%);
  }
  @media (max-width: 370px) {
    width: 50px;
    height: 50px;
    border: 2px solid red;
    transform: translateX(25%);
  }
`;
export default AttackMove;
