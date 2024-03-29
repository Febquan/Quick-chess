import { useEffect } from "react";
import React from "react";
import styled from "styled-components";

type props = {
  win: boolean;
  continueAfterGame: VoidFunction;
  mess: string;
};
const WinLoseBackDrop: React.FC<props> = ({ win, continueAfterGame, mess }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      continueAfterGame();
    }, 2500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [continueAfterGame]);
  return (
    <BackDrop>
      <CusSpan>{win ? "🏆 YOU WIN 🏆" : "GG"}</CusSpan>
      <span>{mess}</span>
    </BackDrop>
  );
};

const CusSpan = styled.span`
  font-size: 2rem;
`;
const BackDrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #05050598;
  z-index: 100;
  transition: all 0.4ms;
  flex-direction: column;
`;

export default WinLoseBackDrop;
