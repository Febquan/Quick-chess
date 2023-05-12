import React, { useState, useEffect, useCallback } from "react";
import { Modal, Form, InputNumber, Radio, Button } from "antd";

import { color } from "../../control/utility/GameData";
import { MySocket } from "../../api/socket";
import { useDispatch } from "react-redux";
import { locationSlice } from "../../store/gameState";
import { RadioChangeEvent } from "antd";
type props = {
  isSettingModal: boolean;
  handleHideSetting: VoidFunction;
  roomHost: boolean;
  roomId: string;
};
type Setting = {
  time: number;
  plusTime: number;
  timeOut: number;
  chessColor: color;
  roomId: string;
};

const SettingModal: React.FC<props> = ({
  isSettingModal,
  handleHideSetting,
  roomHost,
  roomId,
}) => {
  const defaultTime = 90;
  const defaultPlusTime = 30;
  const defaultTimeOut = 2;
  const defaultChessColor = roomHost ? color.Black : color.White;
  const [time, setTime] = useState<string | number | null>(defaultTime);
  const [plusTime, setPlusTime] = useState<string | number | null>(
    defaultPlusTime
  );
  const [timeOut, setTimeOut] = useState<string | number | null>(
    defaultTimeOut
  );
  const [chessColor, setChessColor] = useState<color>(defaultChessColor);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleReciveChangeSeting = async () => {
      const socket = await MySocket.getConection();

      socket?.on(
        "SettingChanged",
        ({ time, plusTime, timeOut, chessColor }: Setting) => {
          setTime(time);
          setPlusTime(plusTime);
          setTimeOut(timeOut);
          const site = chessColor == color.Black ? color.White : color.Black;
          setChessColor(site);
          dispatch(locationSlice.actions.setTime(time));
          dispatch(locationSlice.actions.setPlusTime(plusTime));
          dispatch(locationSlice.actions.setTimeOut(timeOut));
          dispatch(locationSlice.actions.setPlaySite(site));
        }
      );
    };
    handleReciveChangeSeting();
  }, []);

  const handleChangeSeting = useCallback(async () => {
    const socket = await MySocket.getConection();
    socket?.emit("ChangeSetting", {
      time,
      plusTime,
      timeOut,
      chessColor,
      roomId,
    });

    dispatch(locationSlice.actions.setPlaySite(chessColor));
  }, [time, plusTime, timeOut, chessColor, roomId, dispatch]);
  //   useEffect(() => {
  //     const timeOutId = setTimeout(() => {
  //       handleChangeSeting();
  //     }, 800);
  //     return () => {
  //       clearTimeout(timeOutId);
  //     };
  //   }, [time, plusTime, timeOut, chessColor, handleChangeSeting]);
  const handleChangeColor = (e: RadioChangeEvent) => {
    setChessColor(e.target.value);
  };
  return (
    <Modal
      title="Settings"
      open={isSettingModal}
      onCancel={handleHideSetting}
      footer={
        roomHost && (
          <Button type="primary" onClick={handleChangeSeting}>
            Make Change
          </Button>
        )
      }
      centered
    >
      <Form.Item label="Time">
        <InputNumber
          min={5}
          max={90}
          defaultValue={defaultTime}
          disabled={!roomHost}
          value={time}
          onChange={setTime}
        />

        <span className="ant-form-text" style={{ marginLeft: 8 }}>
          min
        </span>
      </Form.Item>
      <Form.Item label="Plus time per move">
        <InputNumber
          min={2}
          max={30}
          defaultValue={defaultPlusTime}
          disabled={!roomHost}
          value={plusTime}
          onChange={setPlusTime}
        />

        <span className="ant-form-text" style={{ marginLeft: 8 }}>
          sec
        </span>
      </Form.Item>
      <Form.Item label="Number of timeout">
        <InputNumber
          min={0}
          max={5}
          defaultValue={defaultTimeOut}
          disabled={!roomHost}
          value={timeOut}
          onChange={setTimeOut}
        />

        <span className="ant-form-text" style={{ marginLeft: 8 }}>
          3 min per timeout
        </span>
      </Form.Item>
      <Form.Item label="Choose chess color">
        <Radio.Group
          disabled={!roomHost}
          defaultValue={defaultChessColor}
          value={chessColor}
          onChange={handleChangeColor}
        >
          <Radio value={color.Black}>Black</Radio>
          <Radio value={color.White}>White</Radio>
        </Radio.Group>
      </Form.Item>
    </Modal>
  );
};

export default SettingModal;
