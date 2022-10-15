import { Box, Button, Card } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useDispatch } from "react-redux";
import { up, down } from "../redux/store";
const Todo = ({ title, phase, id }) => {
  const dispatch = useDispatch();
  const handleClickLeft = () => {
    setTimeout(() => {
      dispatch(down({ id }));
    }, 200);
  };
  const handleClickRight = () => {
    setTimeout(() => {
      dispatch(up({ id }));
    }, 200);
  };
  return (
    <Card
      sx={{
        width: "100%",
        height: 60,
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
      <Button className="btn" disabled={phase === 1} onClick={handleClickLeft}>
        <KeyboardArrowLeftIcon className="arrow" />
      </Button>
      <Box>{title}</Box>
      <Button className="btn" disabled={phase === 4} onClick={handleClickRight}>
        <KeyboardArrowRightIcon className="arrow" />
      </Button>
    </Card>
  );
};

export default Todo;
