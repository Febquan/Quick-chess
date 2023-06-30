import React, { ReactNode } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { userSlice } from "../../store/userState";
import { locationSlice } from "../../store/gameState";
import { GameState } from "../../store/gameState";

import { Button } from "antd";
import Login from "./LoginModal";
import SignUp from "./SignupModal";

import { MyTheme } from "../../style/Theme";

import icon from "./../../../public/chess-game.png";
type props = {
  children?: ReactNode;
  toggleTheme: VoidFunction;
  theme: MyTheme;
};

const Header: React.FC<props> = ({ children, toggleTheme, theme }) => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const name = useSelector((state: RootState) => state.user.name);
  const elo = useSelector((state: RootState) => state.user.elo);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setisSignUpModalOpen] = useState<boolean>(false);
  const roomId = useSelector((state: RootState) => state.location.roomId);
  const mySocket = useSelector((state: RootState) => state.socket.socket);

  const site = useSelector((state: RootState) => state.location.site);
  const dispatch = useDispatch();
  const showLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    dispatch(userSlice.actions.setLogin(false));
    mySocket?.emit("LeaveRoom", roomId);
    dispatch(locationSlice.actions.setGameState(GameState.FINDGAME));
    dispatch(locationSlice.actions.resetLoc(site));
  };
  const handleLoginCancel = () => {
    setIsLoginModalOpen(false);
  };

  const showSignUpModal = () => {
    setisSignUpModalOpen(true);
  };

  const handleSignUpCancel = () => {
    setisSignUpModalOpen(false);
  };
  return (
    <Wrapper>
      <InWrapper>
        <Flex>
          <MyImg src={icon} alt="icon"></MyImg>
          <span>CHESS</span>
        </Flex>

        <Height>
          {!isLogin && (
            <>
              <MyButton type="primary" onClick={showLoginModal}>
                <span>Login</span>
              </MyButton>
              <MyButton type="primary" onClick={showSignUpModal}>
                <span>Sign up</span>
              </MyButton>
            </>
          )}
          {isLogin && (
            <>
              <Flex2>
                <span>Welcome back {name}</span>
                &nbsp; &nbsp;&nbsp;
                <span> Current elo : {elo}</span>
              </Flex2>
            </>
          )}
        </Height>
        <Height>
          <MyButton
            type="primary"
            onClick={toggleTheme}
            style={{ backgroundColor: "white" }}
          >
            <ImgHolder>
              <MyImg
                src={!theme ? "./../../../bulb (1).png" : "./../../../bulb.png"}
                alt="blub-icon"
              />
            </ImgHolder>
          </MyButton>
          {isLogin && (
            <MyButton onClick={onLogout}>
              <span>Logout</span>
            </MyButton>
          )}
        </Height>

        <Login open={isLoginModalOpen} myOnCancel={handleLoginCancel}></Login>
        <SignUp
          open={isSignUpModalOpen}
          myOnCancel={handleSignUpCancel}
        ></SignUp>
        {children}
      </InWrapper>
    </Wrapper>
  );
};

const ImgHolder = styled.div`
  height: 90%;
  width: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  height: 100%;
  & > span {
    font-weight: bolder;
    font-size: larger;
  }
`;
const Flex2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  height: 70%;
`;
const MyButton = styled(Button)`
  height: 100%;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  & > span {
    text-align: center;
  }
`;
const MyImg = styled.img`
  object-fit: cover;
  height: 90%;
`;
const Height = styled.div`
  height: 60%;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Wrapper = styled.div`
  height: var(--header-height);
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 0 0 15px 15px;
  box-shadow: 5px 5px 5px rgba(67, 67, 67, 0.15);
  display: flex;
  justify-content: center;
`;
const InWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3vw;
  width: 50vw;
`;
export default Header;
