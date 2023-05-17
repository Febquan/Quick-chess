import { useEffect, useRef } from "react";
import styled from "styled-components";
import Broad from "./broad/Broad";
import MainControl from "./MainControl/MainControl";
import { MySocket } from "../api/socket";

import { useDispatch } from "react-redux";
import { SocketSlice } from "../store/socket";
import { locationSlice } from "../store/gameState";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
interface TimeRefType {
  addTime: () => void;
  pauseTime: () => void;
  resumeTime: () => void;
}
const MainView: React.FC = () => {
  const dispatch = useDispatch();
  const myTimer = useRef<TimeRefType>(null);
  const myOpponentTimer = useRef<TimeRefType>(null);
  const turn = useSelector((state: RootState) => state.location.turn);
  const handleMakeMoveTimer = () => {
    myTimer.current?.pauseTime();
    myTimer?.current?.addTime();
    myOpponentTimer.current?.resumeTime();
  };
  const handleTimeOutDone = () => {
    dispatch(locationSlice.actions.setShowTimeOut(false));
    if (!turn) myOpponentTimer.current?.resumeTime();
    if (turn) myTimer.current?.resumeTime();
  };

  useEffect(() => {
    const handleSocket = async () => {
      const mySocket = await MySocket.getConection(
        import.meta.env.VITE_BACK_END_URL
      );
      dispatch(SocketSlice.actions.initSocket(mySocket));
    };
    handleSocket();
  }, [dispatch]);
  return (
    <Wrapper>
      <Broad
        handleMakeMoveTimer={handleMakeMoveTimer}
        handleTimeOutDone={handleTimeOutDone}
        myTimer={myTimer}
        opponentTimer={myOpponentTimer}
      />
      <MainControl myTimerRef={myTimer} myOpponentTimerRef={myOpponentTimer} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(100% - var(--header-height));
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5vw;
`;
export default MainView;
