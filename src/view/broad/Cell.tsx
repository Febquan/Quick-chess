import React from "react";
import styled from "styled-components";
import AttackMove from "./utility/attackMove";
import Movable from "./utility/Movable";

import useBoardSize from "../../cusHooks/useBroadSize";

type props = {
  id: number;
  children?: JSX.Element[] | JSX.Element | undefined;
  isAttackedCell?: boolean;
  isMovableCell?: boolean;
};
const Cell: React.FC<props> = ({
  id,
  children,
  isAttackedCell,
  isMovableCell,
}) => {
  const broadSize = useBoardSize();

  const cellSize = broadSize / 8;
  return (
    <Wrapper
      style={{
        backgroundColor:
          Math.floor(id / 8) % 2 == 1
            ? id % 2 == 1
              ? "var(--green)"
              : "var(--white)"
            : id % 2 == 0
            ? "var(--green)"
            : "var(--white)",
      }}
    >
      {children}
      {isAttackedCell && <AttackMove cellSize={cellSize}></AttackMove>}
      {isMovableCell && <Movable cellSize={cellSize}></Movable>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: calc(var(--broad-size) / 8);
  height: calc(var(--broad-size) / 8);
  display: grid;
  justify-content: center;
  align-items: center;
`;

export default Cell;
