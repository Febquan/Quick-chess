import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { Button, Modal, Form, InputNumber, Radio } from "antd";
import { MySocket } from "../../api/socket";
import { FlagFilled } from "@ant-design/icons";
import Chat from "./Chat";

import { useDispatch } from "react-redux";
import { locationSlice } from "../../store/gameState";

import SettingModal from "./SettingModal";
import { color } from "../../control/utility/GameData";
enum GameState {
  FINDGAME,
  NOTREADY,
  READY,
  INGAME,
  ENDGAME,
}
const MainControl: React.FC = () => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const [gameState, setGameState] = useState<GameState>(GameState.FINDGAME);
  const [roomHost, setRoomHost] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>("");
  const [ready, setready] = useState<boolean>(false);
  const [oponentReady, setoponentReady] = useState<boolean>(false);
  const [isSettingModal, setSettingModal] = useState(false);

  const dispatch = useDispatch();
  const handlePlayOnline = async () => {
    const mySocket = await MySocket.getConection(
      import.meta.env.VITE_BACK_END_URL
    );
    mySocket?.on("host", (roomHost) => {
      setRoomHost(roomHost);
      dispatch(
        locationSlice.actions.setPlaySite(roomHost ? color.White : color.Black)
      );
    });
    mySocket?.emit("GameOn");
    mySocket?.on("joined", (roomId) => {
      setGameState(GameState.NOTREADY);
      setRoomId(roomId);
    });
  };
  const handleLeaveRoom = async () => {
    const mySocket = await MySocket.getConection();
    mySocket?.emit("LeaveRoom", roomId);
    setGameState(GameState.FINDGAME);
    setRoomHost(false);
  };
  const handleToggleReady = () => {
    setready((prev) => !prev);
  };
  const handleShowSetting = () => {
    setSettingModal(true);
  };
  const handleHideSetting = () => {
    setSettingModal(false);
  };
  return (
    <>
      {!isLogin && (
        <Wrapper>
          {roomHost && (
            <span>
              You are the room host {"    "}
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
                roomId={roomId}
              />
              <MyButton type={oponentReady ? "primary" : "default"}>
                Oponent ready
              </MyButton>
              <Chat roomId={roomId}></Chat>

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
                      console.log("hello");
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
