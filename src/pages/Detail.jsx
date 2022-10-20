import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import { getTodos } from "../redux/modules/todoReducer";

const Detail = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  console.log(todo);
  const { data, fetcher: getComment } = useAxios(
    apiBaseUrl + "comments",
    "get"
  );
  useLayoutEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div
      onClick={() => {
        getComment();
      }}
    >
      Detail
    </div>
  );
};

export default Detail;
// const { fetcher: postComment } = useAxios(apiBaseUrl + "comments", "post");
// useLayoutEffect(() => {
//   dispatch(getTodos());
// }, [dispatch]);
// const { fetcher: deletComment } = useAxios(apiBaseUrl + "comments", "delete");
// useLayoutEffect(() => {
//   dispatch(getTodos());
// }, [dispatch]);
// const { fetcher: patchComment } = useAxios(apiBaseUrl + "comments", "patch");
// useLayoutEffect(() => {
//   dispatch(getTodos());
// }, [dispatch]);
