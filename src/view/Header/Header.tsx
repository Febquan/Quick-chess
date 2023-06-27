import React, { ReactNode } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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
  const { isLogin, name } = useSelector((state: RootState) => ({
    ...state.user,
  }));

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setisSignUpModalOpen] = useState<boolean>(false);
  const showLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginOk = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginCancel = () => {
    setIsLoginModalOpen(false);
  };

  const showSignUpModal = () => {
    setisSignUpModalOpen(true);
  };

  const handleSignUpOk = () => {
    setisSignUpModalOpen(false);
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
          {isLogin && <span>Welcome back {name}</span>}
        </Height>
        <Button
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
        </Button>
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
  width: 10px;

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
  height: 80%;
`;
const Height = styled.div`
  height: 60%;
  display: flex;
  gap: 10px;
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
