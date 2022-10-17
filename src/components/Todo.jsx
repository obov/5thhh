import { Box, Button, Card } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { up, down, remove, deleteTodo } from "../redux/store";
import { useState } from "react";
import useTimeout from "../hooks/useTimeout";
import useDebounce from "../hooks/useDebounce";

const Todo = ({ title, phase, id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredLong, setIsHoveredLong] = useState(false);
  const dispatch = useDispatch();

  const { setOut, clearOut } = useTimeout(() => {
    setIsHoveredLong(true);
  }, 2000);
  const { setOut: setOutRemove } = useTimeout(() => {
    dispatch(remove({ id, phase }));
  }, 300);
  const { setOut: setOutDelete } = useTimeout(() => {
    dispatch(deleteTodo({ id, phase }));
  }, 300);
  const debouncedRemove = useDebounce(() => {
    setOutRemove();
  }, 300);
  const debouncedDelete = useDebounce(() => {
    setOutDelete();
  }, 300);

  const handleAnimationEndLeft = () => {
    dispatch(down({ id, phase }));
  };
  const handleAnimationEndRight = () => {
    dispatch(up({ id, phase }));
  };
  const handleClickDelete = () => {
    debouncedRemove();
    debouncedDelete();
  };

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
          paddingX: "4px",
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
          ".btn .arrow": {
            color: "transparent",
          },
          "&:hover .btn .arrow": {
            color: "rgba(0,0,0,0.7)",
          },
          ".title": { transition: "1s" },
          "&:hover .title.up": {
            transform: "translateY(-12px)",
          },
          ".fadeBtn": {
            transition: "1s",
            position: "absolute",
            minWidth: "30px",
            maxWidth: "30px",
            height: "30px",
            top: "60px",
            left: "50%",
            transform: "translateX(-50%)",
          },
          ".fadeBtn.up": {
            transform: "translate(-50%,-30px)",
          },
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          setOut();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          clearOut();
          setIsHoveredLong(false);
        }}
      >
        <Button
          className="btn"
          disabled={phase === 1}
          onAnimationEnd={handleAnimationEndLeft}
        >
          <KeyboardArrowLeftIcon className="arrow" />
        </Button>
        <Box className={`title ${isHoveredLong && "up"}`}>{title}</Box>
        <Button
          className="btn"
          disabled={phase === 4}
          onAnimationEnd={handleAnimationEndRight}
        >
          <KeyboardArrowRightIcon className="arrow" />
        </Button>
        {isHovered && (
          <Button
            className={`fadeBtn ${isHoveredLong && "up"}`}
            onClick={handleClickDelete}
          >
            <DeleteIcon />
          </Button>
        )}
      </Card>
    </>
  );
};

export default Todo;
