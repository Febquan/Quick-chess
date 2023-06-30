import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Broad from "./broad/Broad";
import MainControl from "./main-control/MainControl";
import { MySocket } from "../api/socket";
import api from "../api/api";
import { Tag } from "antd";
import { WifiOutlined, ApiOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { SocketSlice } from "../store/socket";
import { GameState, locationSlice } from "../store/gameState";
import { userSlice } from "../store/userState";
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
  const [conectionStatus, setConectStatus] = useState<boolean>(false);
  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  const handleMakeMoveTimer = () => {
    myTimer.current?.pauseTime();
    myTimer?.current?.addTime();
    myOpponentTimer.current?.resumeTime();
  };
  const handleTimeOutDone = () => {
    dispatch(locationSlice.actions.setShowTimeOut(false));
    dispatch(locationSlice.actions.setGameState(GameState.INGAME));
    if (!turn) myOpponentTimer.current?.resumeTime();
    if (turn) myTimer.current?.resumeTime();
  };

  useEffect(() => {
    const handleSocket = async () => {
      try {
        const mySocket = await MySocket.getConection(
          import.meta.env.VITE_BACK_END_URL
        );
        dispatch(SocketSlice.actions.initSocket(mySocket));

        mySocket?.on("connect_error", () => {
          setConectStatus(false);
        });
        mySocket?.on("connect", () => {
          setConectStatus(true);
        });
      } catch (err) {
        console.log(err);
      }
    };
    handleSocket();
    if (localStorage.token) {
      const handleAutoLogin = async () => {
        try {
          const data: { name: string; elo: number } = await api.get(
            "/user/checkAutoLogin"
          );
          dispatch(userSlice.actions.setName(data.name));
          dispatch(userSlice.actions.setElo(data.elo));
          dispatch(userSlice.actions.setLogin(true));
        } catch (err) {
          console.log(err);
        }
      };
      handleAutoLogin();
    }
  }, [dispatch]);
  return (
    <Wrapper>
      <div>
        <Broad
          handleMakeMoveTimer={handleMakeMoveTimer}
          handleTimeOutDone={handleTimeOutDone}
          myTimer={myTimer}
          opponentTimer={myOpponentTimer}
        />
        <Flex>
          {conectionStatus && (
            <MyTag
              icon={<WifiOutlined twoToneColor="#52c41a" />}
              color="success"
            >
              Connection stable
            </MyTag>
          )}
          {!conectionStatus && (
            <MyTag
              icon={<ApiOutlined twoToneColor="#c41a1a" spin={true} />}
              color="error"
            >
              Connection error
            </MyTag>
          )}
        </Flex>
      </div>
      {isLogin && (
        <MainControl
          myTimerRef={myTimer}
          myOpponentTimerRef={myOpponentTimer}
        />
      )}
    </Wrapper>
  );
};
const MyTag = styled(Tag)`
  position: relative;
  left: 0;
  top: 0;
`;
const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const Wrapper = styled.div`
  height: calc(100% - var(--header-height));
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5vw;
  flex-wrap: wrap;
  padding: 20px;
`;
export default MainView;
