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
import { add, postNewTodo } from "../redux/modules/todoReducer";
import { setPhase, setRef } from "../redux/store";
import Modal from "./Modal";

const MainInput = () => {
  const dispatch = useDispatch();
  const phases = JSON.parse(process.env.REACT_APP_PHASES);
  const phaseNum = useSelector((state) => state.phaseNum);
  const initModal = { now: false, move: false, transition: false };
  const [isModal, setIsModal] = useState(initModal);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const inputRef = useRef(null);

  const handleChangeTitle = ({ target }) => {
    setNewTodoTitle(target.value);
  };
  const handleSubmit = (e) => {
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
  const handleFocus = () => {
    if (isModal.now) return;
    setIsModal({ now: true, move: false, transition: false });
  };

  const handleClick = () => {
    if (isModal.now) return;
    setIsModal({ now: true, move: false, transition: false });
  };
  const handleClickModalBack = () => {
    if (!isModal.move) return;
    setIsModal({ now: true, move: false, transition: true });
  };

  useEffect(() => {
    dispatch(setRef(inputRef));
  }, [dispatch]);
  useEffect(() => {
    if (isModal.now) {
      setIsModal({ now: true, move: true, transition: true });
    }
  }, [isModal.now]);
  useEffect(() => {
    if (!isModal.move) {
      setTimeout(() => {
        setIsModal({ now: false, move: false, transition: false });
        setNewTodoTitle("");
      }, 200);
    }
  }, [isModal.move]);

  return (
    <>
      {isModal.now ? <Modal portal onClick={handleClickModalBack} /> : null}
      <Box
        sx={{
          width: "100%",
          minHeight: "80px",
          position: "sticky",
          top: 12,
          zIndex: 2,
        }}
        onFocus={handleFocus}
        onClick={handleClick}
      >
        <Card
          sx={{
            display: "flex",
            width: "65%",
            marginX: "auto",
            minHeight: "80px",
            padding: "0 24px 0 16px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            backgroundColor: isModal.now ? "white" : "rgb(248,248,248)",
            borderRadius: "12px",
            border: isModal.now
              ? "2px solid transparent"
              : "2px solid rgba(0,0,0,0.5)",
            boxShadow: isModal.now
              ? "0 6px 32px rgba(255,255,255,1),0 3px 16px rgba(255,255,255,1)"
              : "",
            transform: isModal.move && "translateY(50%)",
            transition: isModal.transition && "0.3s",
            "@media (max-width: 600px)": {
              width: "95%",
              minWidth: "280px",
            },
            ".selectWrapper": {
              m: 1,
              flexGrow: 0,
              ".select": {
                minWidth: "48px",
                maxWidth: "48px",
                minHeight: "48px",
                ".color": {
                  width: "24px",
                  height: "24px",
                  marginX: "auto",
                },
              },
            },
            ".form": {
              display: "flex",
              gap: "6px",
              flexGrow: 2,
              ".input": {
                width: "100%",
              },
            },
          }}
        >
          <FormControl className="selectWrapper">
            <Select
              value={phaseNum}
              className="select"
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
                <MenuItem
                  sx={{ transform: "translateY(10px)" }}
                  key={phase.num}
                  value={phase.num}
                >
                  <Card
                    className="color"
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
          <Box className="form" component="form" onSubmit={handleSubmit}>
            <TextField
              value={newTodoTitle}
              className="input"
              onChange={handleChangeTitle}
              label={phases.find((phase) => phase.num === phaseNum).name}
              variant="standard"
              ref={inputRef}
              autoComplete="off"
              placeholder="This is your next to do"
              required
            />
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default MainInput;
