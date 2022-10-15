import { Box } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Board from "../components/Board";
import MainInput from "../components/MainInput";

const Boards = () => {
  const todos = useSelector((state) => state.todos);
  const [phaseNum, setPhaseNum] = useState(1);
  const phases = JSON.parse(process.env.REACT_APP_PHASES);
  return (
    <>
      <MainInput phaseNum={phaseNum} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        {phases.map((phase) => (
          <Board
            key={phase.name}
            type={phase.name}
            color={phase.color}
            todos={todos.filter((todo) => todo.phase === phase.num)}
            setPhase={() => setPhaseNum(phase.num)}
          />
        ))}
      </Box>
    </>
  );
};

export default Boards;
