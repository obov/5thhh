import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import { getTodos } from "../redux/modules/todoReducer";
import { Box, Button, Input } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";

const Detail = () => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(null);
  const dispatch = useDispatch();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const { id } = useParams(); //주소를 보내주는 id

  const todos = useSelector((state) => state.todos.data);

  const { data, fetcher: getComment } = useAxios(
    apiBaseUrl + "comments",
    "get"
  );

  const { fetcher: postComment, isLoading } = useAxios(
    apiBaseUrl + "comments",
    "post"
  );

  const handleSubmit = (e) => {
    e.preventDefault(); //새로고침 막아줌
    postComment({ id: Date.now(), body: newComment, todoId: +id });
    setNewComment("");
  };
  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  useLayoutEffect(() => {
    dispatch(getTodos());
  }, [dispatch, isLoading]);

  useEffect(() => {
    getComment();
  }, []);

  useEffect(() => {
    setComments(data);
  }, [data]);

  return (
    <div
      onClick={() => {
        getComment();
      }}
    >
      <Box
        sx={{
          fontSize: "45px",
          marginTop: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        🔔
        {
          todos.find(function (todo) {
            return todo.id == id;
          }).title
        }
      </Box>
      <div>
        <form onSubmit={handleSubmit}>
          {/* 기본틀임 enter만 쳐도 자동으로 submit됨 */}
          <Input
            value={newComment}
            onChange={handleChange} //글자적어주기
            placeholder="댓글"
            name="content"
            type="text"
            maxLength={100}
            style={{ marginTop: "170px" }}
          />
          <Button style={{ fontSize: "20px" }} type="submit">
            추가하기
          </Button>
        </form>
        <Box>
          {comments
            ?.filter((comment) => {
              return comment.todoId == id;
            })
            .map((comment, i) => {
              return <Comment key={i} comment={comment} />;
            })}
        </Box>
      </div>
    </div>
  );
};

export default Detail;
