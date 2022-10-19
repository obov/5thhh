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
  const initModal = { now: false, move: false, transition: false };
  const [isModal, setIsModal] = useState(initModal);
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
      setTimeout(
        () => setIsModal({ now: false, move: false, transition: false }),
        200
      );
    }
  }, [isModal.move]);
  return (
    <>
      {isModal.now ? (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 10,
            backdropFilter: "blur(3px)",
          }}
          onClick={handleClickModalBack}
        />
      ) : null}
      <Box
        sx={{
          width: "100%",
          minHeight: "80px",
        }}
        onFocus={handleFocus}
        onClick={handleClick}
      >
        <Card
          sx={{
            display: "flex",
            width: "70%",
            marginX: "auto",
            minHeight: "80px",
            padding: "0 24px 0 16px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            "@media (max-width: 600px)": {
              width: "95%",
              minWidth: "280px",
            },
            position: isModal.now ? "relative" : "static",
            zIndex: isModal.now ? 11 : 0,
            boxShadow: isModal.now
              ? "0 6px 32px rgba(255,255,255,1),0 3px 16px rgba(255,255,255,1)"
              : "",
            top: isModal.move && "50%",
            transform: isModal.move && "translateY(50%)",
            transition: isModal.transition && "0.3s",
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
              autoComplete="off"
            />
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default MainInput;
