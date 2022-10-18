import { Box, Button, Card, TextField } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteTodo, patchTodo } from "../redux/store";
import { useState } from "react";
import useTimeout from "../hooks/useTimeout";
import useDebounce from "../hooks/useDebounce";
import { useRef } from "react";
import { useEffect } from "react";

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

  const handleMouseEnder = () => {
    setIsHovered(true);
    setOut();
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    clearOut();
    setIsHoveredLong(false);
  };

  const patchPrevDebounced = debouncer(() => {
    dispatch(patchTodo({ id, phase: phase - 1, updated: Date.now() }));
  });
  const handleClickPrev = () => {
    patchPrevDebounced();
  };

  const patchNextDebounced = debouncer(() => {
    dispatch(patchTodo({ id, phase: phase + 1, updated: Date.now() }));
  });
  const handleClickNext = () => {
    patchNextDebounced();
  };

  const deletDebounced = debouncer(() => {
    dispatch(deleteTodo({ id, phase }));
  });
  const handleClickDelete = () => {
    deletDebounced();
  };
  const handleClickEdit = () => {
    setIsEditing(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setTodoTitle(newTitle);
    dispatch(patchTodo({ id, title: newTitle }));
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
          minHeight: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "24px",
          paddingX: "2px",
          position: "relative",
          ".btn": {
            maxWidth: "30px",
            maxHeight: "30px",
            minWidth: "30px",
            minHeight: "30px",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          },
          ".btn:hover": {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
          ".btn .arrow": {
            color: "transparent",
          },
          "&:hover .btn .arrow": {
            color: "rgba(0,0,0,0.7)",
          },
          ".editInput": { transform: "translateY(-14px)", width: "80%" },
          ".title": {
            transition: "0.5s",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            cursor: "pointer",
            padding: "2px",
            borderRadius: "5px",
          },
          ".title:hover": {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
          "&:hover .title.up": {
            transform: "translateY(-14px)",
          },
          ".fadeBtns": {
            width: "100%",
            height: "36px",
            display: "flex",
            justifyContent: "center",
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
          },
        }}
        onMouseEnter={handleMouseEnder}
        onMouseLeave={handleMouseLeave}
      >
        <Button
          className="btn"
          disabled={phase === 1}
          onClick={handleClickPrev}
        >
          <KeyboardArrowLeftIcon className="arrow" />
        </Button>
        {isEditing ? (
          <Box className="editInput" component="form" onSubmit={handleSubmit}>
            <TextField
              value={newTitle}
              onChange={handleChangeNewTitle}
              onBlur={handleBlur}
              id="standard-basic"
              label={null}
              variant="standard"
              ref={inputRef}
            />
          </Box>
        ) : (
          <Box className={`title ${(isHoveredLong || isEditing) && "up"}`}>
            {todoTitle}
          </Box>
        )}
        <Button
          className="btn"
          disabled={phase === 4}
          onClick={handleClickNext}
        >
          <KeyboardArrowRightIcon className="arrow" />
        </Button>
        {(isHovered || isEditing) && (
          <Box className={`fadeBtns ${(isHoveredLong || isEditing) && "up"}`}>
            <Button className="delete" onClick={handleClickDelete}>
              <DeleteIcon />
            </Button>
            <Button className="edit" onClick={handleClickEdit}>
              <EditIcon />
            </Button>
          </Box>
        )}
      </Card>
    </>
  );
};

export default Todo;
