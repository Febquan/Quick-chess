import React from "react";
import styled from "styled-components";

const Movable: React.FC = () => {
  return <Circle></Circle>;
};

const Circle = styled.div`
  width: 25px;
  height: 25px;
  background-color: #5a5a5a;
  border-radius: 50%;
  opacity: 20%;
  position: absolute;
  transform: translateX(100%);
  z-index: 0;
`;
export default Movable;
