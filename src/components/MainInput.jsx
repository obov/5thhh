import {
  Box,
  Card,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, postNewTodo, setPhase, setRef } from "../redux/store";

const MainInput = () => {
  const dispatch = useDispatch();
  const phases = JSON.parse(process.env.REACT_APP_PHASES);
  const phaseNum = useSelector((state) => state.phaseNum);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const inputRef = useRef(null);

  const handleChangeTitle = ({ target }) => {
    setNewTodoTitle(target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDate = Date.now();
    const newTodo = {
      id: newDate,
      title: newTodoTitle,
      phase: phaseNum,
      updated: newDate,
    };
    dispatch(add(newTodo));
    dispatch(postNewTodo(newTodo));
    setNewTodoTitle("");
  };
  const handleChangePhase = ({ target }) => {
    dispatch(setPhase(target.value));
  };

  useEffect(() => {
    dispatch(setRef(inputRef));
  }, [dispatch]);
  return (
    <Card
      sx={{
        display: "flex",
        width: "70%",
        minHeight: "80px",
        padding: "0 24px 0 16px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        "@media (max-width: 600px)": {
          width: "95%",
          minWidth: "280px",
        },
      }}
    >
      <FormControl
        sx={{
          m: 1,
          flexGrow: 0,
        }}
      >
        <Select
          value={phaseNum}
          sx={{ minWidth: "48px", maxWidth: "48px", minHeight: "48px" }}
          onChange={handleChangePhase}
          displayEmpty
          inputProps={{
            "aria-label": "Without label",
            IconComponent: () => null,
            sx: {
              padding: "0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: "0px !important",
            },
          }}
        >
          {phases.map((phase) => (
            <MenuItem key={phase.num} value={phase.num}>
              <Card
                sx={{
                  width: "24px",
                  height: "24px",
                  marginX: "auto",
                  backgroundColor: phase.color,
                }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{ display: "flex", gap: "6px", flexGrow: 2 }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          value={newTodoTitle}
          sx={{ width: "100%" }}
          onChange={handleChangeTitle}
          id="standard-basic"
          label={phases.find((phase) => phase.num === phaseNum).name}
          variant="standard"
          ref={inputRef}
        />
      </Box>
    </Card>
  );
};

export default MainInput;
