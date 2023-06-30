import React from "react";
import styled from "styled-components";
import Timer from "../../main-control/Timer";
import { useSelector } from "react-redux";

import { RootState } from "../../../store/store";
type props = {
  handleExpire: VoidFunction;
};
const TimeOutBackDrop: React.FC<props> = ({ handleExpire }) => {
  // const TimeOut = new Date(new Date().getTime() + 3 * 60 * 1000);
  const numberOfTime = useSelector(
    (state: RootState) => state.location.timeOutTime
  );
  const TimeOut = new Date(new Date().getTime() + numberOfTime * 60 * 1000);
  return (
    <BackDrop>
      <CusSpan>Timeout</CusSpan>
      <CusTimer
        autoStart={true}
        expriryTime={TimeOut}
        plusTime={0}
        ExpireFuc={handleExpire}
      />
    </BackDrop>
  );
};

const CusTimer = styled(Timer)`
  font-size: 5rem;
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

export default TimeOutBackDrop;
