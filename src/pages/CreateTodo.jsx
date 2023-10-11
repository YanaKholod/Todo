import React from "react";
import Form from "../components/Form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getCurrentUser } from "../redux/auth/actions";
import { addTodo } from "../redux/todos/actions";

const Styled = {
  WrapperCreate: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    h1 {
      text-align: center;
      color: rgb(36, 50, 70);
      font-size: 30px;
      margin: 12px 0;
    }
    @media (max-width: 768px) {
      font-size: 15px;
      h1 {
        font-size: 23px;
      }
    }
  `,
  WrapperFormCreate: styled.div`
    display: flex;
    justify-content: center;
  `,
};
const CreateTodo = () => {
  const dispatch = useDispatch();

  const addNewTodo = async (data) => {
    await dispatch(
      addTodo({
        ...data,
        isCompleted: data.isCompleted === "true" ? true : false,
      })
    );

    await dispatch(getCurrentUser());
  };

  return (
    <Styled.WrapperCreate>
      <h1>Type in your task</h1>
      <Styled.WrapperFormCreate>
        <Form onFormSubmit={addNewTodo} buttonName={"Add"} />
      </Styled.WrapperFormCreate>
    </Styled.WrapperCreate>
  );
};

export default CreateTodo;
