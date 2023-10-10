import React from "react";
import { Sidebar } from "../Constants";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Styled = {
  BurgerWrapper: styled.div`
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    position: absolute;
    margin-top: 312px;
    right: 0;
    width: 280px;
    z-index: 30;
    background-color: #80a6deb3;
    @media (max-width: 320px) {
      width: 320px;
      justify-content: end;
    }
  `,
  BurgerItem: styled(NavLink)`
    list-style-type: none;
    margin: 18px 19px;
    background-color: #ffffff;
    border-radius: 40em;
    color: rgb(36, 50, 70);
    cursor: pointer;
    font-weight: 700;
    text-decoration: none;
    font-size: 17px;
    padding: 10px 17px;
    text-align: center;
    box-shadow: rgb(36, 50, 70) 0 -4px 8px inset;
  `,
};

const BurgerMenu = () => {
  return (
    <Styled.BurgerWrapper>
      {Sidebar.map((item) => (
        <Styled.BurgerItem key={item.id} to={item.link}>
          {item.title}
        </Styled.BurgerItem>
      ))}
    </Styled.BurgerWrapper>
  );
};

export default BurgerMenu;
