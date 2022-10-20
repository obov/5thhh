import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import { getTodos } from "../redux/modules/todoReducer";

const Detail = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  console.log(todo);
  const { isLoading, data, fetcher } = useAxios(apiBaseUrl + "comments", "get");
  useLayoutEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div
      onClick={() => {
        fetcher();
      }}
    >
      Detail
    </div>
  );
};

export default Detail;
