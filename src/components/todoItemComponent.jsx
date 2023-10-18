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
    flex-direction: column;
    align-items: start;
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
  MainLine: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
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
    div {
      font-size: 13px;
    }
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
    align-items: end;
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
  SubTodoItem: styled.div`
    padding-bottom: 4px;
  `,
};

const TodoItemComponent = ({ todoItem }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleDone = async (_id) => {
    await dispatch(updateTodo({ isCompleted: true, _id }));
    await dispatch(getCurrentUser());
  };

  const handleDelete = async (_id) => {
    await dispatch(deleteTodoById(_id));
    await dispatch(getCurrentUser());
  };

  const handleEdit = async (data, _id) => {
    await dispatch(
      updateTodo({
        ...data,
        _id,
        isCompleted: data.isCompleted === "true" ? true : false,
      })
    );
    await dispatch(getCurrentUser());
  };

  return (
    <>
      <Styled.Wrapper isCompleted={todoItem.isCompleted}>
        <Styled.MainLine>
          <Styled.Title>
            {todoItem.title}
            <div>{todoItem.description}</div>
          </Styled.Title>
          <Styled.ButtonsWrapper>
            <Styled.DoneButton
              isDone={todoItem.isCompleted}
              onClick={() => {
                handleDone(todoItem._id);
              }}
            >
              Done
            </Styled.DoneButton>
            <Styled.DeleteButton
              onClick={() => {
                handleDelete(todoItem._id);
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
          </Styled.ButtonsWrapper>
        </Styled.MainLine>
        {todoItem.subTodo.length > 0 && (
          <div>
            SubTodo:
            <div>
              {todoItem.subTodo.map((item) => (
                <Styled.SubTodoItem key={item.title}>
                  {item.title}
                </Styled.SubTodoItem>
              ))}
            </div>
          </div>
        )}
      </Styled.Wrapper>
    </>
  );
};

export default TodoItemComponent;
