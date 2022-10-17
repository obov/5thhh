import { Box, Button, Card } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useDispatch } from "react-redux";
import { up, down } from "../redux/store";
const Todo = ({ title, phase, id }) => {
  const dispatch = useDispatch();
  const handleAnimationEndLeft = () => {
    dispatch(down({ id, phase }));
  };
  const handleAnimationEndRight = () => {
    dispatch(up({ id, phase }));
  };
  return (
    <Card
      sx={{
        width: "100%",
        minHeight: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "24px",
        paddingX: "4px",
        ".btn": {
          maxWidth: "30px",
          maxHeight: "30px",
          minWidth: "30px",
          minHeight: "30px",
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".btn .arrow": {
          color: "transparent",
        },
        "&:hover .btn .arrow": {
          color: "rgba(0,0,0,0.5)",
        },
      }}
    >
      <Button
        className="btn"
        disabled={phase === 1}
        onAnimationEnd={handleAnimationEndLeft}
      >
        <KeyboardArrowLeftIcon className="arrow" />
      </Button>
      <Box>{title}</Box>
      <Button
        className="btn"
        disabled={phase === 4}
        onAnimationEnd={handleAnimationEndRight}
      >
        <KeyboardArrowRightIcon className="arrow" />
      </Button>
    </Card>
  );
};

export default Todo;
