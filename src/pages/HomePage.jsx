import React, { useState, useEffect } from "react";
import TodoItemComponent from "../components/todoItemComponent";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchAllTodos } from "../redux/todos/actions";

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
  NoItem: styled.div`
    color: rgb(36, 50, 70);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
  `,
  Pagination: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    button {
      font-weight: bold;
      font-size: 16px;
      margin: 0 10px;
      padding: 5px 10px;
      border-radius: 5px;
      color: black;
      border-color: black;
      cursor: pointer;
      &:hover {
      }
    }
    span {
      font-weight: bold;
    }
    select {
      border-radius: 4px;
      padding: 5px;
      background-color: transparent;
      border: 1px solid black;
      color: black;
    }
  `,
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { todosArray } = useSelector((state) => state.todos);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setIsLoading(true);

      dispatch(fetchAllTodos());
    }
  }, [dispatch, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Styled.WrapperMain>
      <h1>To do list</h1>
      {user ? (
        <Styled.WrapperTodos>
          {todosArray &&
            todosArray.map((item) => (
              <TodoItemComponent key={item.title} todoItem={item} />
            ))}
        </Styled.WrapperTodos>
      ) : (
        <Styled.NoItem>No tasks, log into the application.</Styled.NoItem>
      )}
    </Styled.WrapperMain>
  );
};

export default HomePage;
