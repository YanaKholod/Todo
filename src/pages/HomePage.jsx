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
  const [showCompletedItems, setShowCompletedItems] = useState(false);
  const [showActiveItems, setShowActiveItems] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: "isCompleted",
    sortOrder: "false",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sortData, setSortData] = useState("isCompletedFalse");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todosArray } = useSelector((state) => state.todos);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchAllTodos());
    }
  }, [dispatch, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSortAsc = async () => {
    setSortData("true");
    setSortCriteria({ sortBy: "isCompleted", sortOrder: "true" });
  };

  const handleSortDesc = async () => {
    setSortData("false");
    setSortCriteria({ sortBy: "isCompleted", sortOrder: "false" });
  };

  const handlePageChange = async (newPage) => {
    if (page <= totalPages) {
      await setPage(newPage);
      navigate(`?page=${page}&perPage=${perPage}`);
    }
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
    navigate(`?page=1&perPage=${perPage}`);
  };

  return (
    <Styled.WrapperMain>
      <h1>To do list</h1>
      {user ? (
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
          {todosArray &&
            todosArray.map((item) => (
              <TodoItemComponent key={item.title} todoItem={item} />
            ))}
          <Styled.Pagination>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span> Page {page} </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
            <select
              value={perPage}
              onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </Styled.Pagination>
        </Styled.WrapperTodos>
      ) : (
        <Styled.NoItem>No tasks, log into the application.</Styled.NoItem>
      )}
    </Styled.WrapperMain>
  );
};

export default HomePage;
