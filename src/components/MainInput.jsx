import { Card, TextField } from "@mui/material";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { add, setRef } from "../redux/store";

const MainInput = ({ phaseNum }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const handleChangeTitle = ({ target }) => {
    setNewTodoTitle(target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add({ id: Date.now(), title: newTodoTitle, phase: phaseNum }));
    setNewTodoTitle("");
  };
  const phases = JSON.parse(process.env.REACT_APP_PHASES);
  useEffect(() => {
    dispatch(setRef(inputRef));
  });
  return (
    <Card
      sx={{ width: "80%", padding: "16px", display: "flex", gap: "6px" }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Card
        sx={{
          width: "24px",
          padding: "24px",
          backgroundColor: phases.find((p) => p.num === phaseNum).color,
        }}
      />
      <TextField
        value={newTodoTitle}
        sx={{ width: "100%" }}
        onChange={handleChangeTitle}
        id="standard-basic"
        label="Standard"
        variant="standard"
        ref={inputRef}
      />
    </Card>
  );
};

export default MainInput;
