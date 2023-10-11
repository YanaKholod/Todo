import React, { useState } from "react";
import { Sidebar } from "../Constants";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BurgerMenu from "./BurgerMenu";

const Styled = {
  AllSidebar: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 40px;
    background-color: #80a6deb3;
    @media (max-width: 500px) {
      padding: 10px;
      justify-content: end;
    }
  `,
  WrapperSidebar: styled.div`
    display: flex;
    @media (max-width: 500px) {
      display: none;
    }
  `,
  Menu: styled.div`
    display: flex;
    width: 100%;
    list-style-type: none;
    text-decoration: none;
    font-size: 25px;
    div {
      margin: 0 30px;
    }
  `,
  Link: styled(Link)`
    text-decoration: none;
    color: #243246;
    font-size: 30px;
    @media (max-width: 768px) {
      font-size: 25px;
    }
  `,
  BurgerMenu: styled.div`
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 50px;
    height: 50px;
    cursor: pointer;
    padding: 8px;
    @media (max-width: 500px) {
      display: flex;
    }
  `,
  Div: styled.div`
    width: 100%;
    height: 5px;
    background-color: rgb(36, 50, 70);
    margin: 5px 0;
    border-radius: 4px;
  `,
  Login: styled.button`
    font-size: 16px;
    line-height: 1.5;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    color: rgb(36, 50, 70);
    border: 2px solid rgb(36, 50, 70);
    background-color: transparent;
    text-decoration: none;
    margin-right: 7px;
    cursor: pointer;
    &:hover {
      background-color: rgb(36, 50, 70);
      color: white;
    }

    @media (max-width: 850px) {
      font-size: 14px;
      line-height: 1.5;
      padding: 5px 10px;
    }
  `,
  Register: styled.button`
    font-size: 16px;
    line-height: 1.5;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    margin-right: 12px;
    text-decoration: none;
    color: rgb(36, 50, 70);
    background-color: transparent;
    border: 2px solid rgb(36, 50, 70);
    cursor: pointer;
    &:hover {
      background-color: rgb(36, 50, 70);
      color: white;
    }

    @media (max-width: 850px) {
      font-size: 14px;
      line-height: 1.5;
      padding: 5px 10px;
    }
  `,
  Buttons: styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 850px) {
      padding: 2px;
    }
  `,
};
const Menu = () => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openLoginModal = () => {
    navigate("/login");
  };

  const openRegisterModal = () => {
    navigate("/register");
  };

  return (
    <Styled.AllSidebar>
      <Styled.Buttons>
        <Styled.Login onClick={openLoginModal}>Login</Styled.Login>
        <Styled.Register onClick={openRegisterModal}>Register</Styled.Register>
      </Styled.Buttons>

      <Styled.BurgerMenu onClick={() => setIsOpenModal(!isOpenModal)}>
        <Styled.Div></Styled.Div>
        <Styled.Div></Styled.Div>
        <Styled.Div></Styled.Div>
        {isOpenModal && <BurgerMenu />}
      </Styled.BurgerMenu>
      <Styled.WrapperSidebar>
        <Styled.Menu>
          {Sidebar.map((item) => (
            <div key={item.id}>
              <Styled.Link to={item.link}>{item.title}</Styled.Link>
            </div>
          ))}
        </Styled.Menu>
      </Styled.WrapperSidebar>
    </Styled.AllSidebar>
  );
};

export default Menu;
