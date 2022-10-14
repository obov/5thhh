import { Box } from "@mui/material";
import Board from "../components/Board";
import Layout from "../components/Layout";
import MainInput from "../components/MainInput";

const Boards = () => {
  return (
    <>
      <MainInput />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Board type="todo" color="salmon" />
        <Board type="ing" color="gold" />
        <Board type="done" color="skyblue" />
        <Board type="defer" color="chocolate" />
      </Box>
    </>
  );
};

export default Boards;
