import { Box, Card, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteTodo, patchTodo } from "../redux/modules/todoReducer";
import { useState } from "react";
import useTimeout from "../hooks/useTimeout";
import useDebounce from "../hooks/useDebounce";
import { useRef } from "react";
import { useEffect } from "react";
import btnFather from "./btnFather";
import { Link, useNavigate } from "react-router-dom";

const Todo = ({ title, phase, id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredLong, setIsHoveredLong] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);
  const [newTitle, setNewTitle] = useState(todoTitle);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const { setOut, clearOut } = useTimeout(() => {
    setIsHoveredLong(true);
  }, 1200);

  const debouncer = useDebounce(1000);

  const dispatchDebounced = useRef(
    debouncer((action) => {
      dispatch(action);
    })
  ).current;

  const logDebounced = useRef(debouncer(console.log)).current;

  const handleClickPrev = () => {
    dispatchDebounced(patchTodo({ id, phase: phase - 1, updated: Date.now() }));
  };
  const handleClickNext = () => {
    dispatchDebounced(patchTodo({ id, phase: phase + 1, updated: Date.now() }));
    logDebounced(10, 10);
  };

  const handleClickDelete = () => {
    dispatchDebounced(deleteTodo({ id, phase }));
  };
  const handleMouseEnder = () => {
    setIsHovered(true);
    setOut();
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    clearOut();
    setIsHoveredLong(false);
  };
  const handleClickEdit = () => {
    setIsEditing(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    if (newTitle !== todoTitle) {
      setTodoTitle(newTitle);
      dispatch(patchTodo({ id, title: newTitle }));
    }
  };
  const handleChangeNewTitle = ({ target }) => {
    setNewTitle(target.value);
  };
  const handleBlur = () => {
    setNewTitle(todoTitle);
    setIsEditing(false);
  };
  useEffect(() => {
    if (isEditing) {
      inputRef.current.children[0].children[0].focus();
    }
  }, [isEditing]);
  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: "100%",
          minHeight: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "24px",
          paddingX: "2px",
          position: "relative",
          backgroundColor: "rgb(250,250,250)",
          boxShadow: "0 0 3px rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: "0 0 4px white",
            backgroundColor: "white",
            ".title": {
              color: "rgb(15,15,15)",
            },
            ".title.up": {
              transform: "translateY(-14px)",
            },
            ".btn .arrow": {
              color: "rgba(0,0,0,0.7)",
            },
          },
          ".title": {
            width: "100%",
            transition: "0.5s",
            textOverflow: "ellipsis",
            overflow: "hidden",
            cursor: "pointer",
            padding: "2px",
            borderRadius: "12px",
            color: "rgb(80,80,80)",
            "&:hover": {
              backgroundColor: "rgb(236,236,236)",
            },
            ".span": {
              textOverflow: "ellipsis",
              textAlign: "center",
              width: "100%",
              maxWidth: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
            },
            "@media (max-width: 900px)": { width: "50%", marginX: "auto" },
          },

          ".btn": {
            maxWidth: "24px",
            maxHeight: "24px",
            minWidth: "24px",
            minHeight: "24px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            "&:hover": {
              backgroundColor: "rgb(236,236,236)",
            },
            ".arrow": {
              color: "transparent",
            },
          },

          ".editForm": {
            transform: "translateY(-14px)",
            width: "100%",
            ".editInput": { width: "100%" },
          },

          ".fadeBtns": {
            width: "50%",
            height: "36px",
            display: "flex",
            justifyContent: "center",
            gap: "4px",
            transition: "0.5s",
            position: "absolute",
            top: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            ".delete, .edit": {
              minWidth: "30px",
              maxWidth: "30px",
              height: "30px",
              borderRadius: "16px",
            },
            ".delete:hover, .edit:hover": {
              backgroundColor: "rgba(0,0,0,0.1)",
            },
            "&.up": {
              transform: "translate(-50%,-28px)",
            },
            "@media (max-width: 900px)": { gap: "12px" },
          },
        }}
        onMouseEnter={handleMouseEnder}
        onMouseLeave={handleMouseLeave}
      >
        <btnFather.LeftArrow
          className="btn"
          disabled={phase === 1}
          onClick={handleClickPrev}
          iconClassName="arrow"
        />
        {isEditing ? (
          <Box className="editForm" component="form" onSubmit={handleSubmit}>
            <TextField
              className="editInput"
              value={newTitle}
              onChange={handleChangeNewTitle}
              onBlur={handleBlur}
              label={null}
              variant="standard"
              ref={inputRef}
              autoComplete="off"
              spellCheck="false"
            />
          </Box>
        ) : (
          <Box className={`title ${(isHoveredLong || isEditing) && "up"}`}>
            <Link
              to={String(id)}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Box className="span">{todoTitle}</Box>
            </Link>
          </Box>
        )}
        <btnFather.RightArrow
          className="btn"
          disabled={phase === 4}
          onClick={handleClickNext}
          iconClassName="arrow"
        />
        {(isHovered || isEditing) && (
          <Box className={`fadeBtns ${(isHoveredLong || isEditing) && "up"}`}>
            <btnFather.Delete className="delete" onClick={handleClickDelete} />
            <btnFather.Edit className="edit" onClick={handleClickEdit} />
          </Box>
        )}
      </Card>
    </>
  );
};

export default Todo;
