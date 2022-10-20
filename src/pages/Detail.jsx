<<<<<<< Updated upstream
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
=======
import { Box, Input } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import getTodos from "../redux/store";

function Detail() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); //주소를 보내주는 id

  // useEffect(() => {
  //   dispatch(getTodos());
  // }, [dispatch]);

  const todos = useSelector((state) => state.todos.data);
  console.log(todos);
  return (
    <div>
      <Box
        sx={{
          background:
            "linearGradient(54deg, rgba(233,233,219,1) 0%, rgba(255,255,192,0.8071603641456583) 45%, rgba(255,208,105,0.7819502801120448) 100%)",
          borderRadius: "20px",
          fontSize: "45px",
          marginTop: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        🔔
        {
          todos.find(function (todo) {
            return todo.id == id;
          }).title
        }
      </Box>
      <div>
        <Input
          placeholder="댓글"
          // value={comment.content}
          name="content"
          type="text"
          // onChange={onChangeInputHandler}
          maxLength={100}
        />
        <button type="submit">추가하기</button>
      </div>
    </div>
  );
}
>>>>>>> Stashed changes

export default Detail;
/*

const { fetcher: postComment } = useAxios(apiBaseUrl + "comments", "post");

const { fetcher: deletComment } = useAxios(apiBaseUrl + "comments", "delete");

const { fetcher: patchComment } = useAxios(apiBaseUrl + "comments", "patch");


 */
