import React, { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Input, Space } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type props = {
  children?: ReactNode;
};
const Chat: React.FC<props> = () => {
  const [message, setMessage] = useState<string>("");
  const [allMessage, setallMessage] = useState<ReactNode[]>([]);
  const socket = useSelector((state: RootState) => state.socket.socket);
  const roomId = useSelector((state: RootState) => state.location.roomId);
  useEffect(() => {
    const handleReciveMess = async () => {
      socket?.on("SendMessage", (mess) => {
        setallMessage((prev) => [
          <OponentChat key={prev.length + 1}>
            <span>{mess}</span>
          </OponentChat>,
          ...prev,
        ]);
      });
      socket?.on("ServerSendMessage", (mess) => {
        setallMessage((prev) => [
          <ServerChat key={prev.length + 1}>
            <span>{mess}</span>
          </ServerChat>,
          ...prev,
        ]);
      });
    };
    handleReciveMess();
    return () => {
      socket?.off("SendMessage");
      socket?.off("ServerSendMessage");
    };
  }, [socket]); // Run this effect only once on component mount
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleChat = async () => {
    if (!message) return;
    socket?.emit("SendMessage", message, roomId);
    setallMessage((prev) => [
      <MyChat key={prev.length + 1}>
        <span>{message}</span>
      </MyChat>,
      ...prev,
    ]);
    setMessage("");
  };

  return (
    <Relative>
      <Chatbox>{allMessage}</Chatbox>
      <RoomBox>
        <span>Room: {roomId}</span>{" "}
      </RoomBox>
      <Space.Compact style={{ width: "100%" }} size="large">
        <Input
          value={message}
          onChange={handleInputChange}
          onPressEnter={handleChat}
        />
        <Button type="primary" onClick={handleChat}>
          Submit
        </Button>
      </Space.Compact>
    </Relative>
  );
};
const RoomBox = styled.div`
  display: flex;
  padding: 10px;
  background-color: var(--primary-color);
  opacity: 0.8;
  margin-top: -10px;
  margin-bottom: 30px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 20px 0px;
  color: var(--text-color);
  & > span {
    padding-top: 8px;
    padding-left: 8px;
  }
`;
const MyChat = styled.div`
  text-align: right;
  margin-bottom: 25px;
  color: var(--text-color);
  & > span {
    padding: 8px;
    border-radius: 5px;
    background: var(--background-color);
    width: fit-content;
  }
`;

const ServerChat = styled.div`
  text-align: center;
  margin-bottom: 25px;
  color: var(--text-color);
  & > span {
    padding: 8px;
    border-radius: 5px;
  }
`;
const OponentChat = styled.div`
  margin-bottom: 25px;
  color: var(--text-color);
  & > span {
    padding: 8px;
    border-radius: 5px;
    background: var(--background-color);
    width: fit-content;
  }
`;
const Chatbox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  word-wrap: break-word;
  height: 300px;
  width: 100%;
  padding: 20px;
  margin-bottom: -3px;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.47);
  border-radius: 8px 8px 0 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.59);
  overflow-y: auto;
`;

const Relative = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;
export default Chat;
