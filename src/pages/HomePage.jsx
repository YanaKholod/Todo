import React, { useState, useEffect } from "react";
import TodoItemComponent from "../components/todoItemComponent";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchAllTodos } from "../redux/todos/actions";
import { ColorRing } from "react-loader-spinner";
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
  Spinner: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
    return (
      <Styled.Spinner>
        <ColorRing
          visible={true}
          height="120"
          width="120"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#cbcbcb", " #f9cedf", " #84d593", " #509fff"]}
        />
      </Styled.Spinner>
    );
  }

  return (
    <Styled.WrapperMain>
      <h1>To do list</h1>

      {user ? (
        <>
          <Styled.ToggleButton onClick={() => setShowArchived(!showArchived)}>
            {showArchived ? "Show active" : "Show archived"}
          </Styled.ToggleButton>

          <Styled.WrapperTodos>
            {todosArray &&
              todosArray.map((item) => {
                if (showArchived ? item.isArchived : !item.isArchived) {
                  return <TodoItemComponent key={item.title} todoItem={item} />;
                }
                return null;
              })}
          </Styled.WrapperTodos>
        </>
      ) : (
        <Styled.NoItem>No items, try to log in.</Styled.NoItem>
      )}
    </Styled.WrapperMain>
  );
};

export default HomePage;
