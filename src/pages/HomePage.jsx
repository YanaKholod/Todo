import React, { useState, useEffect } from "react";
import TodoItemComponent from "../components/todoItemComponent";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchAllTodos } from "../redux/todos/actions";
import { useNavigate } from "react-router-dom";

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
};

const HomePage = () => {
  const [showCompletedItems, setShowCompletedItems] = useState(false);
  const [showActiveItems, setShowActiveItems] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: "companyName",
    sortOrder: "true",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sortData, setSortData] = useState("asc");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todosArray } = useSelector((state) => state.todos);
  const { user } = useSelector((state) => state.auth);

  console.log("todosArray", todosArray);
  useEffect(() => {
    dispatch(fetchAllTodos({ page, perPage, sort: sortCriteria }))
      .then((response) => {
        const { currentPage, totalPages } = response.payload;
        setPage(currentPage);
        setTotalPages(totalPages);
        setIsLoading(false);
        navigate(
          `?page=1&perPage=${perPage}&sortBy=${sortCriteria.sortBy}&sortOrder=${sortCriteria.sortOrder}`
        );
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setIsLoading(false);
      });
  }, [dispatch, user, page, perPage, sortCriteria, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSortAsc = async () => {
    setSortData("asc");
    setSortCriteria({ sortBy: "companyName", sortOrder: "asc" });
  };

  const handleSortDesc = async () => {
    setSortData("desc");
    setSortCriteria({ sortBy: "companyName", sortOrder: "desc" });
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
  // useEffect(() => {
  //   dispatch(fetchAllTodos());
  // }, []);

  // console.log("TODOS ARRAY", todosArray);
  // const press = () => {
  //   const page = 1;
  //   const perPage = 10;
  //   dispatch(fetchAllTodos({ page, perPage }));
  // };
  // useEffect(() => {
  //   setTodosForShow(todosCollection);
  // }, [todosCollection]);

  // useEffect(() => {
  //   const activeTodos = todosCollection.filter((item) => !item.isCompleted);
  //   setTodosForShow(activeTodos);
  // }, [showActiveItems]);

  // useEffect(() => {
  //   const completedTodos = todosCollection.filter((item) => item.isCompleted);
  //   setTodosForShow(completedTodos);
  // }, [showCompletedItems]);

  // useEffect(() => {
  //   setTodosForShow(todosCollection);
  // }, [showAllItems]);

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
              <TodoItemComponent key={item.id} todoItem={item} />
            ))}
        </Styled.WrapperTodos>
      ) : (
        <Styled.NoItem>No tasks, log into the application.</Styled.NoItem>
      )}
    </Styled.WrapperMain>
  );
};

export default HomePage;
