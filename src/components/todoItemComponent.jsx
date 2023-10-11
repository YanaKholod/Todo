import React from "react";
import Form from "../components/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getCurrentUser } from "../redux/auth/actions";
import {
  deleteTodoById,
  switchIsCompleted,
  updateTodo,
} from "../redux/todos/actions";

const Styled = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    margin: 5px;
    padding: 12px;
    border-radius: 10px;
    ${({ isCompleted }) => (isCompleted ? "background-color: #84d5936a;" : "")}
    @media (max-width: 620px) {
      padding: 7px 10px;
      justify-content: space-around;
    }
    @media (max-width: 500px) {
      flex-direction: column;
      justify-content: space-around;
    }
  `,
  Title: styled.div`
    font-size: 23px;
    cursor: default;
    width: 100%;
    padding-right: 7px;
    text-align: start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 768px) {
      font-size: 17px;
    }
    @media (max-width: 500px) {
      display: flex;
      justify-content: center;
    }
  `,
  ButtonsWrapper: styled.div`
    display: flex;
    width: 100%;
    justify-content: end;
    position: relative;
    align-items: center;
    @media (max-width: 768px) {
      font-size: 13px;
    }
    @media (max-width: 500px) {
      justify-content: center;
    }
  `,
  DoneButton: styled.div`
    background-color: #84d593;
    color: #375b3d;
    border: 1px solid #375b3d;
    height: max-content;
    border-radius: 20px;
    text-align: center;
    padding: 8px 14px;
    margin: 0 3px;
    cursor: pointer;
    ${({ isDone }) => (isDone ? "display: none;" : "")}
    @media (max-width: 620px) {
      margin: 5px 2px;
      padding: 6px 8px;
    }
  `,
  DeleteButton: styled.div`
    background-color: #f9cedf;
    color: #663535;
    border: 1px solid #663535;
    border-radius: 20px;
    text-align: center;
    height: max-content;
    padding: 8px 14px;
    margin: 0 3px;
    cursor: pointer;
    @media (max-width: 620px) {
      margin: 5px 2px;
      padding: 6px 8px;
    }
  `,
  EditButton: styled.div`
    background-color: #cbcbcb;
    color: #535252;
    border: 1px solid #535252;
    border-radius: 20px;
    text-align: center;
    padding: 8px 23px;
    height: max-content;
    margin: 0 3px;
    cursor: pointer;
    ${({ stopEdit }) => (stopEdit ? "display: none;" : "")}
    @media (max-width: 620px) {
      margin: 5px 2px;
      padding: 6px 8px;
    }
  `,
  Description: styled.div`
    padding: 10px;
    border: 5px;
    display: none;
    width: max-content;
    margin: 10px;
    z-index: 5;
    inline-size: 280px;
    overflow-wrap: break-word;
    hyphens: manual;
  `,
  Modal: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c6bfbf81;
    backdrop-filter: blur(14px);
    z-index: 9999;
  `,
};
Styled.InfoButton = styled.div`
  background-color: #fff9ab;
  color: #656129;
  border: 1px solid #656129;
  border-radius: 20px;
  text-align: center;
  height: max-content;
  padding: 8px 25px;
  margin: 0 3px;
  cursor: pointer;
  @media (max-width: 620px) {
    margin: 5px 2px;
    padding: 6px 8px;
  }
  &:hover ~ ${Styled.Description} {
    display: block;
    position: absolute;
    border-radius: 10px;
    padding: 5px;
    left: 50%;
    z-index: 20;
    top: 75%;
    background-color: #cbcbcb;
    border: 1px solid #535252;
  }
`;

const TodoItemComponent = ({ todoItem }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleDone = async (data, id) => {
    await dispatch(
      switchIsCompleted({
        data: { ...data, isCompleted: true },
      })
    );
    await dispatch(getCurrentUser());
  };

  const handleDelete = async (id) => {
    await dispatch(deleteTodoById(id));
    await dispatch(getCurrentUser());
  };

  const handleEdit = async (data, id) => {
    await dispatch(
      updateTodo({
        data: {
          ...data,
          isCompleted: data.isCompleted === "true" ? true : false,
        },
        id,
      })
    );
    await dispatch(getCurrentUser());
  };
  return (
    <Styled.Wrapper isCompleted={todoItem.isCompleted}>
      <Styled.Title>{todoItem.title}</Styled.Title>
      <Styled.ButtonsWrapper>
        <Styled.DoneButton
          isDone={todoItem.isCompleted}
          onClick={() => {
            handleDone(todoItem, todoItem.id);
          }}
        >
          Done
        </Styled.DoneButton>
        <Styled.DeleteButton
          onClick={() => {
            handleDelete(todoItem.id);
          }}
        >
          Delete
        </Styled.DeleteButton>
        <Styled.EditButton
          stopEdit={todoItem.isCompleted}
          onClick={() => setShowModal(true)}
        >
          Edit
        </Styled.EditButton>
        {showModal && (
          <Styled.Modal>
            <Form
              setShowModal={setShowModal}
              initialData={todoItem}
              buttonName={"Save"}
              onFormSubmit={handleEdit}
            />
          </Styled.Modal>
        )}
        <Styled.InfoButton>Info</Styled.InfoButton>
        <Styled.Description>
          <div>{todoItem.description}</div>
          <div>
            {todoItem.isCompleted
              ? `Created: ${new Date(todoItem.createdAt).toUTCString()}, 
              Completed: ${new Date(todoItem.completedAt).toUTCString()} `
              : `Created: ${new Date(todoItem.createdAt).toUTCString()}`}
          </div>
        </Styled.Description>
      </Styled.ButtonsWrapper>
    </Styled.Wrapper>
  );
};

export default TodoItemComponent;
