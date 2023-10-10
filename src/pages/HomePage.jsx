import React, { useState, useEffect } from "react";
import TodoItemComponent from "../components/todoItemComponent";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../store/slice";
import styled from "styled-components";

const Styled = {
  WrapperTodos: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    overflow: scroll;
  `,
  WrapperMain: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    h1 {
      text-align: center;
      color: rgb(36, 50, 70);
      font-size: 30px;
      margin: 12px 0;
    }
  `,
  WrapperTodos: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `,
  WrapperFilterButtons: styled.div`
    display: flex;
    justify-content: start;
    width: 82%;
    margin-bottom: 5px;
    @media (max-width: 768px) {
      font-size: 13px;
    }
  `,
  Filters: styled.div`
    display: flex;
    width: max-content;
    justify-content: start;
    cursor: pointer;
    div {
      margin: 0 3px;
      padding: 5px;
      border: 1px solid #663535;
      border-radius: 10px;
      background-color: #f9cedf;
      color: #663535;
    }
  `,
};

const HomePage = () => {
  const [showCompletedItems, setShowCompletedItems] = useState(false);
  const [showActiveItems, setShowActiveItems] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [todosForShow, setTodosForShow] = useState(todosCollection);

  const dispatch = useDispatch();
  const todosCollection = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  useEffect(() => {
    setTodosForShow(todosCollection);
  }, [todosCollection]);

  useEffect(() => {
    const activeTodos = todosCollection.filter((item) => !item.isCompleted);
    setTodosForShow(activeTodos);
  }, [showActiveItems]);

  useEffect(() => {
    const completedTodos = todosCollection.filter((item) => item.isCompleted);
    setTodosForShow(completedTodos);
  }, [showCompletedItems]);

  useEffect(() => {
    setTodosForShow(todosCollection);
  }, [showAllItems]);

  return (
    <Styled.WrapperMain>
      <h1>To do list</h1>
      <Styled.WrapperTodos>
        <Styled.WrapperFilterButtons>
          <Styled.Filters>
            <div onClick={() => setShowAllItems(!showAllItems)}>All</div>
            <div onClick={() => setShowActiveItems(!showActiveItems)}>
              Active
            </div>
            <div onClick={() => setShowCompletedItems(!showCompletedItems)}>
              Completed
            </div>
          </Styled.Filters>
        </Styled.WrapperFilterButtons>
        {todosForShow &&
          todosForShow.map((item) => (
            <TodoItemComponent key={item.id} todoItem={item} />
          ))}
      </Styled.WrapperTodos>
    </Styled.WrapperMain>
  );
};

export default HomePage;
