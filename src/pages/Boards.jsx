import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Board from "../components/Board";
import MainInput from "../components/MainInput";
import { useLayoutEffect } from "react";
import { getTodos } from "../redux/modules/todoReducer";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const Boards = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state);
  const phases = JSON.parse(process.env.REACT_APP_PHASES);
  useLayoutEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  console.log("todos :", todos);
  return (
    <>
      <MainInput />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          overflow: "hidden",
          padding: "20px",
          justifyContent: "center",
          gap: "16px",
          "@media (max-width: 900px)": {
            flexDirection: "column",
            justifyContent: "flex-start",
          },
        }}
      >
        {todos.status === "fulfilled" ? (
          phases.map((phase) => (
            <Board key={phase.name} phase={phase} todos={todos[phase.num]} />
          ))
        ) : (
          <Spinner />
        )}
      </Box>
    </>
  );
};

export default Boards;
