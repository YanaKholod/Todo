import React, { useState, useEffect } from "react";
import TodoItemComponent from "../components/todoItemComponent";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchAllTodos } from "../redux/todos/actions";

const Styled = {
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
    overflow: scroll;
  `,
  NoItem: styled.div`
    color: rgb(36, 50, 70);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
  `,
  ToggleButton: styled.button`
    justify-content: end;
    border: 1px solid #1f1657;
    width: 15%;
    border-radius: 20px;
    text-align: center;
    padding: 8px 14px;
    margin: 0 3px;
    cursor: pointer;
  `,
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const dispatch = useDispatch();
  const { todosArray } = useSelector((state) => state.todos);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      dispatch(fetchAllTodos());
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Styled.WrapperMain>
      <h1>To do list</h1>
      <Styled.ToggleButton onClick={() => setShowArchived(!showArchived)}>
        {showArchived ? "Show active" : "Show archived"}
      </Styled.ToggleButton>

      {user ? (
        <Styled.WrapperTodos>
          {todosArray &&
            todosArray.map((item) => {
              if (showArchived ? item.isArchived : !item.isArchived) {
                return <TodoItemComponent key={item.title} todoItem={item} />;
              }
              return null;
            })}
        </Styled.WrapperTodos>
      ) : (
        <Styled.NoItem>No tasks, log into the application.</Styled.NoItem>
      )}
    </Styled.WrapperMain>
  );
};

export default HomePage;
