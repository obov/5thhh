import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Board from "../components/Board";
import MainInput from "../components/MainInput";

const Boards = () => {
  const todos = useSelector((state) => state);
  console.log("todos:", todos);
  return (
    <>
      <MainInput />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <Board
          type="todo"
          color="salmon"
          todos={todos.filter((todo) => todo.phase === 1)}
        />
        <Board
          type="ing"
          color="gold"
          todos={todos.filter((todo) => todo.phase === 2)}
        />
        <Board
          type="done"
          color="skyblue"
          todos={todos.filter((todo) => todo.phase === 3)}
        />
        <Board
          type="defer"
          color="chocolate"
          todos={todos.filter((todo) => todo.phase === 4)}
        />
      </Box>
    </>
  );
};

export default Boards;
