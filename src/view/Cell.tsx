import React from "react";
import styled from "styled-components";
type props = {
  id: number;
  children?: JSX.Element;
};
const Cell: React.FC<props> = ({ id, children }) => {
  return (
    <Wrapper
      style={{
        backgroundColor:
          Math.floor((id - 1) / 8) % 2 == 1
            ? id % 2 == 1
              ? "var(--green)"
              : "var(--white)"
            : id % 2 == 0
            ? "var(--green)"
            : "var(--white)",
      }}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: calc(var(--broad-size) / 8);
  height: calc(var(--broad-size) / 8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Cell;
