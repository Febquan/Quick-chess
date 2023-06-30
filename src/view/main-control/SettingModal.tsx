import React, { useState, useEffect, useCallback } from "react";
import { Modal, Form, InputNumber, Radio, notification } from "antd";

import { color } from "../../control/utility/GameData";
import { useDispatch, useSelector } from "react-redux";
import { locationSlice } from "../../store/gameState";
import { RadioChangeEvent } from "antd";
import { RootState } from "../../store/store";
type props = {
  isSettingModal: boolean;
  handleHideSetting: VoidFunction;
  roomHost: boolean;
};
type Setting = {
  time: number;
  plusTime: number;
  timeOut: number;
  chessColor: color;
};

const SettingModal: React.FC<props> = ({
  isSettingModal,
  handleHideSetting,
  roomHost,
}) => {
  const roomId = useSelector((state: RootState) => state.location.roomId);
  const [pop, contextHolder] = notification.useNotification();
  const openConfirmNoti = useCallback(() => {
    pop["success"]({
      message: "Đổi setting thành công",
      placement: "bottomRight",
      duration: 0.5,
    });
  }, [pop]);

  const defaultTime = useSelector((state: RootState) => state.location.time);
  const defaultPlusTime = useSelector(
    (state: RootState) => state.location.plusTime
  );
  const defaultTimeOut = useSelector(
    (state: RootState) => state.location.timeOut
  );

  const [time, setTime] = useState<string | number | null>(defaultTime);
  const [plusTime, setPlusTime] = useState<string | number | null>(
    defaultPlusTime
  );
  const [timeOut, setTimeOut] = useState<string | number | null>(
    defaultTimeOut
  );
  const chessColor = useSelector((state: RootState) => state.location.site);
  const dispatch = useDispatch();
  const socket = useSelector((state: RootState) => state.socket.socket);

  useEffect(() => {
    const handleReciveChangeSeting = async () => {
      socket?.on("ConfirmSettingChanged", () => {
        openConfirmNoti();
      });
      socket?.on(
        "SettingChanged",
        ({ time, plusTime, timeOut, chessColor }: Setting) => {
          setTime(time);
          setPlusTime(plusTime);
          setTimeOut(timeOut);
          const site = chessColor == color.Black ? color.White : color.Black;
          dispatch(locationSlice.actions.setPlaySite(site));
          dispatch(locationSlice.actions.setTime(time));
          dispatch(locationSlice.actions.setPlusTime(plusTime));
          dispatch(locationSlice.actions.setTimeOut(timeOut));
          dispatch(locationSlice.actions.setPlaySite(site));
          // openConfirmNoti();
          socket?.emit("MySettingChanged");
        }
      );
    };
    handleReciveChangeSeting();
    return () => {
      socket?.off("SettingChanged");
      socket?.off("ConfirmSettingChanged");
    };
  }, [dispatch, openConfirmNoti, socket]);

  //   dispatch(locationSlice.actions.setPlaySite(chessColor));
  // }, [time, plusTime, timeOut, chessColor, roomId, dispatch]);
  useEffect(() => {
    const handleChangeSeting = async () => {
      socket?.emit("ChangeSetting", {
        time,
        plusTime,
        timeOut,
        chessColor,
        roomId,
      });
    };
    const timeOutId = setTimeout(() => {
      handleChangeSeting();
    }, 800);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [chessColor, plusTime, roomId, socket, time, timeOut]);
  const handleChangeColor = (e: RadioChangeEvent) => {
    dispatch(locationSlice.actions.setPlaySite(e.target.value));
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Settings"
        open={isSettingModal}
        onCancel={handleHideSetting}
        footer={<></>}
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
            value={chessColor}
            onChange={handleChangeColor}
          >
            <Radio value={color.Black}>Black</Radio>
            <Radio value={color.White}>White</Radio>
          </Radio.Group>
        </Form.Item>
      </Modal>
    </>
  );
};

export default SettingModal;
