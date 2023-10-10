import React, { useState } from "react";
import { Sidebar } from "../Constants";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BurgerMenu from "./BurgerMenu";

const Styled = {
  AllSidebar: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
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
};
const Menu = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <Styled.AllSidebar>
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
