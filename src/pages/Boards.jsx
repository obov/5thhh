import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Board from "../components/Board";
import MainInput from "../components/MainInput";

const Boards = () => {
  const todos = useSelector((state) => state.todos);
  const phases = JSON.parse(process.env.REACT_APP_PHASES);
  return (
    <>
      <MainInput />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          overflow: "hidden",
          padding: "4px",
          justifyContent: "center",
          gap: "24px",
          "@media (max-width: 900px)": {
            flexDirection: "column",
            justifyContent: "flex-start",
          },
        }}
      >
        {phases.map((phase) => (
          <Board key={phase.name} phase={phase} todos={todos[phase.num]} />
        ))}
      </Box>
    </>
  );
};

export default Boards;
