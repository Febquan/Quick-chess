import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { Button } from "antd";
import { FlagFilled } from "@ant-design/icons";
import Chat from "./Chat";

import { useDispatch } from "react-redux";
import { locationSlice } from "../../store/gameState";
import { GameState } from "../../store/gameState";

import SettingModal from "./SettingModal";
import { color } from "../../control/utility/GameData";

import { ReflexId } from "../broad/utility/helper";
interface props {
  myTimerRef: React.RefObject<TimeRefType>;
  myOpponentTimerRef: React.RefObject<TimeRefType>;
}
import { isCheckMate } from "../../control/pieceControl/KingControl";
interface TimeRefType {
  addTime: () => void;
  pauseTime: () => void;
  resumeTime: () => void;
}
import Timer from "./Timer";

const MainControl: React.FC<props> = ({ myTimerRef, myOpponentTimerRef }) => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const turn = useSelector((state: RootState) => state.location.turn);
  const numberOfTimeOut = useSelector(
    (state: RootState) => state.location.timeOut
  );
  const countDowTime = useSelector((state: RootState) => state.location.time);
  const myExpriredTime = new Date(
    new Date().getTime() + countDowTime * 60 * 1000
  );

  const plusTime = useSelector((state: RootState) => state.location.plusTime);

  const roomId = useSelector((state: RootState) => state.location.roomId);
  const gameState: GameState = useSelector(
    (state: RootState) => state.location.gameState
  );
  const site = useSelector((state: RootState) => state.location.site);

  const [roomHost, setRoomHost] = useState<boolean>(false);
  const [ready, setready] = useState<boolean>(false);
  const [oponentReady, setoponentReady] = useState<boolean>(false);
  const [isSettingModal, setSettingModal] = useState(false);
  const mySocket = useSelector((state: RootState) => state.socket.socket);
  const dispatch = useDispatch();
  const handlePlayOnline = async () => {
    mySocket?.emit("GameOn");
    dispatch(locationSlice.actions.resetLoc(site));
  };
  const handleLeaveRoom = async () => {
    mySocket?.emit("LeaveRoom", roomId);
    dispatch(locationSlice.actions.setGameState(GameState.FINDGAME));
    dispatch(locationSlice.actions.resetLoc(site));
    setRoomHost(false);
    setready(false);
    setoponentReady(false);
  };
  const handleToggleReady = () => {
    mySocket?.emit("IamReady", roomId);
    setready((prev) => !prev);
  };
  const handleShowSetting = () => {
    setSettingModal(true);
  };
  const handleHideSetting = () => {
    setSettingModal(false);
  };
  const handkeGameStart = () => {
    dispatch(locationSlice.actions.setGameState(GameState.INGAME));
    dispatch(locationSlice.actions.setTurn(true));
    setoponentReady(false);
    setready(false);
    mySocket?.emit("GameStart", roomId);
  };
  const handleCallTimeOut = () => {
    dispatch(locationSlice.actions.setShowTimeOut(true));
    dispatch(locationSlice.actions.afterUseTimeOut());
    myOpponentTimerRef.current?.pauseTime();
    myTimerRef.current?.pauseTime();
    mySocket?.emit("TimeOut", roomId);
  };
  const handleSurrender = () => {
    mySocket?.emit("Surrender", roomId);
  };
  const handleDraw = () => {
    mySocket?.emit("CallDraw", roomId);
    myOpponentTimerRef.current?.pauseTime();
    myTimerRef.current?.pauseTime();
  };
  useEffect(() => {
    const handleSocket = async () => {
      mySocket?.on("host", (roomHost) => {
        setRoomHost(roomHost);
        dispatch(
          locationSlice.actions.setPlaySite(
            roomHost ? color.White : color.Black
          )
        );
      });
      mySocket?.on("joined", (roomId) => {
        dispatch(locationSlice.actions.setRoomId(roomId));
        setready(false);
        dispatch(locationSlice.actions.setGameState(GameState.NOTREADY));
      });
      mySocket?.on("OpponentReady", () => {
        setoponentReady((prev) => !prev);
      });
      mySocket?.on("OpponentLeave", () => {
        setready(false);
        setoponentReady(false);
      });
      mySocket?.on("GameStart", () => {
        dispatch(locationSlice.actions.setGameState(GameState.INGAME));
        setoponentReady(false);
        setready(false);
      });
      mySocket?.on("OpponentMakeMove", (allLocation, name, currentId) => {
        dispatch(locationSlice.actions.setTurn(true));
        const keys = Object.keys(allLocation);
        keys.forEach((piece) => {
          const locs = Object.keys(allLocation[piece]);
          locs.forEach((loc) => {
            if (loc === "pcolor") {
              return;
            }
            allLocation[piece][loc] = allLocation[piece][loc].map(
              (id: number) => ReflexId(id)
            );
          });
        });
        dispatch(locationSlice.actions.renderGivenLoc(allLocation));
        myOpponentTimerRef?.current?.pauseTime();
        myOpponentTimerRef?.current?.addTime();
        myTimerRef?.current?.resumeTime();
        console.log("sau:", allLocation);
        console.log(name, ReflexId(currentId), isCheckMate(allLocation, site));
        dispatch(
          locationSlice.actions.setCheckMate(isCheckMate(allLocation, site))
        );
      });
      mySocket?.on("OpponentCallTimeOut", () => {
        dispatch(locationSlice.actions.setShowTimeOut(true));
        myOpponentTimerRef.current?.pauseTime();
        myTimerRef.current?.pauseTime();
      });
    };
    handleSocket();
    return () => {
      mySocket?.off("host");
      mySocket?.off("joined");
      mySocket?.off("OpponentReady");
      mySocket?.off("OpponentLeave");
      mySocket?.off("OpponentMakeMove");
    };
  }, [dispatch, myOpponentTimerRef, mySocket, myTimerRef, roomId, site]);

  return (
    <>
      {!isLogin && (
        <Wrapper>
          {roomHost && gameState == GameState.NOTREADY && (
            <span>
              You are the room host
              <FlagFilled />
            </span>
          )}
          {gameState == GameState.FINDGAME && (
            <>
              <MyButton type="primary" onClick={handlePlayOnline}>
                PLay online
              </MyButton>
              <MyButton type="primary">PLay with friend</MyButton>
            </>
          )}
          {gameState == GameState.NOTREADY && (
            <>
              <SettingModal
                roomHost={roomHost}
                isSettingModal={isSettingModal}
                handleHideSetting={handleHideSetting}
              />
              <MyButton type={oponentReady ? "primary" : "default"}>
                Oponent ready
              </MyButton>
            </>
          )}
          {gameState == GameState.INGAME && (
            <MyCountDowWrapper>
              <Timer
                autoStart={!turn}
                ref={myOpponentTimerRef}
                expriryTime={myExpriredTime}
                plusTime={plusTime}
              ></Timer>
              <Turn>{!turn ? "⌛" : ""}</Turn>
            </MyCountDowWrapper>
          )}
          {(gameState == GameState.INGAME ||
            gameState == GameState.NOTREADY ||
            gameState == GameState.ENDGAME) && <Chat></Chat>}
          {gameState == GameState.INGAME && (
            <>
              <MyCountDowWrapper>
                <Timer
                  autoStart={turn}
                  ref={myTimerRef}
                  expriryTime={myExpriredTime}
                  plusTime={plusTime}
                />
                <Turn>{turn ? "⌛" : ""}</Turn>
              </MyCountDowWrapper>

              <Flex>
                <SubButton
                  onClick={handleCallTimeOut}
                  disabled={!turn || numberOfTimeOut <= 0}
                >
                  Call timeout {numberOfTimeOut}
                </SubButton>
                <SubButton disabled={!turn} onClick={handleDraw}>
                  Call for a draw
                </SubButton>
                <SubButton danger onClick={handleSurrender}>
                  Surrender
                </SubButton>
              </Flex>
            </>
          )}

          {gameState == GameState.NOTREADY && (
            <>
              <MyButton
                type={ready ? "primary" : undefined}
                onClick={handleToggleReady}
              >
                Ready ?
              </MyButton>
              <Flex>
                <SubButton onClick={handleShowSetting}>Game setting</SubButton>

                {roomHost && (
                  <SubButton
                    disabled={!(ready && oponentReady)}
                    onClick={() => {
                      handkeGameStart();
                    }}
                  >
                    START GAME
                  </SubButton>
                )}
                <SubButton onClick={handleLeaveRoom} danger>
                  Leave room
                </SubButton>
              </Flex>
            </>
          )}
        </Wrapper>
      )}
    </>
  );
};

const SubButton = styled(Button)`
  font-weight: bolder;
`;
const MyCountDowWrapper = styled.div`
  position: relative;
  padding: 10px;
  background-color: var(--background-color-light);
  border-radius: 8px;
  font-size: 35px;
`;
const Turn = styled.span`
  position: absolute;
  top: 10px;
  right: -55px;
`;
const MyButton = styled(Button)`
  font-size: large;
  font-weight: bolder;
  height: 60px;
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3vh;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export default MainControl;
