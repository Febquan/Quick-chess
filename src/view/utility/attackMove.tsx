import React from "react";
import styled from "styled-components";

const AttackMove: React.FC = () => {
  return <Circle></Circle>;
};

const Circle = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid red;
  opacity: 30%;
  border-radius: 50%;
  position: absolute;
  transform: translateX(25%);
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
