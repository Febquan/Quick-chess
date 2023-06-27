import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
interface TimeRefType {
  addTime: () => void;
  pauseTime: () => void;
  resumeTime: () => void;
}
type props = {
  showDraw: (show: boolean) => void;
  drawMess: string;
  setDrawMess: React.Dispatch<React.SetStateAction<string>>;
  continueAfterGame: VoidFunction;
  myTimer: React.RefObject<TimeRefType>;
  opponentTimer: React.RefObject<TimeRefType>;
};
const DrawBackDrop: React.FC<props> = ({
  showDraw,
  drawMess,
  setDrawMess,
  continueAfterGame,

  opponentTimer,
}) => {
  const socket = useSelector((state: RootState) => state.socket.socket);
  const roomId = useSelector((state: RootState) => state.location.roomId);
  const handleAccept = () => {
    socket?.emit("AcceptDraw", roomId);
    setDrawMess("Draw !");
  };
  const handleDecline = () => {
    socket?.emit("DeclineDraw", roomId);
    showDraw(false);
    opponentTimer.current?.resumeTime();
  };

  return (
    <BackDrop>
      <CusSpan>{drawMess ? drawMess : "Opponent call for a draw"}</CusSpan>
      {!drawMess && (
        <Flex>
          <Button onClick={handleDecline}>Decline</Button>
          <Button onClick={handleAccept}>Accept</Button>
        </Flex>
      )}
      {drawMess && drawMess !== "Decline !" && (
        <Button onClick={continueAfterGame}>Continue</Button>
      )}
    </BackDrop>
  );
};
const Flex = styled.span`
  display: flex;
  gap: 20px;
`;
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

export default DrawBackDrop;
