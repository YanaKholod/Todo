import styled from "styled-components";

export const Sidebar = [
  {
    id: 0,
    title: "Main",
    link: "/",
  },
  {
    id: 1,
    title: "Create",
    link: "/create",
  },
];

export const emailRegexp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export const Styled = {
  Wrapper: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 22px;
      font-weight: 400;
      color: rgb(36, 50, 70);
    }
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    text-align: center;
    width: 300px;
  `,
  Input: styled.input`
    padding: 8px 30px 8px 8px;
    width: 100%;
    text-align: left;
    font-weight: 400;
    font-size: 16px;
    transition-duration: 450ms;
    color: darkblue;
    border-style: none;
    border-width: 0px;
    border-radius: 0px;
    background: transparent;
    margin: 0px;
    display: block;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-bottom: 1px solid darkblue;
    margin-left: 5px;
    :hover {
      border-bottom: 3px solid darkblue;
    }
    :focus {
      border-bottom: 3px solid darkblue;
    }
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
  `,
  Label: styled.label`
    align-items: center;
    justify-content: center;
    color: rgb(36, 50, 70);
  `,
  Errors: styled.div`
    margin-top: 5px;
    color: #c10000;
    font-size: 12px;
    p {
      font-size: 12px;
      margin: 0;
    }
  `,
  Button: styled.button`
    border: 0;
    background-color: transparent;
    color: black;
    border-radius: 8px;
    width: 40%;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 4px;
    padding: 6px 16px;
    position: relative;
    z-index: 10;
    border: 2px solid rgb(36, 50, 70);
    &:hover {
      background-color: rgb(36, 50, 70);
      color: white;
    }

    /* @media (max-width: 360px) {
      width: 190px;
      font-size: 13px;
    } */
  `,
  Field: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    margin-bottom: 20px;
    width: 100%;
  `,
  ButtonLine: styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
  `,
};
