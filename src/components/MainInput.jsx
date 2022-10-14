import { TextField } from "@mui/material";
import { useState } from "react";

const MainInput = () => {
  const [newTodo, setNewTodo] = useState({ title: "", content: "" });
  const handleChangeTitle = ({ target }) => {
    const copyTodo = { ...newTodo };
    copyTodo.title = target.value;
    setNewTodo(copyTodo);
  };
  // const handleChangeContent = ({ target }) => {
  //   const copyTodo = { ...newTodo };
  //   copyTodo.content = target.value;
  //   setNewTodo(copyTodo);
  // };
  return (
    <TextField
      value={newTodo.title}
      onChange={handleChangeTitle}
      sx={{ width: "100%" }}
      id="standard-basic"
      label="Standard"
      variant="standard"
    />
  );
};

export default MainInput;
