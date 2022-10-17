import { Button, Card } from "@mui/material";
import Todo from "./Todo";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setPhase } from "../redux/store";
import { Box } from "@mui/system";

const Board = ({ phase, todos }) => {
  const { color, name } = phase;
  const inputRef = useSelector((state) => state.inputRef);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setPhase(phase.num));
    inputRef.current.children[1].children[0].focus();
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: "1",
        paddingY: "16px",
        borderRadius: "24px",
        gap: "16px",
        maxHeight: "80vh",
        "@media (max-width: 900px)": {
          paddingX: "8px",
          flexDirection: "row",
          minHeight: `${
            todos.length > 2
              ? todos.length < 6
                ? todos.length * 60
                : 300
              : 120
          }px`,
          flex: 0,
        },
      }}
    >
      <Card
        sx={{
          backgroundColor: color,
          width: "95%",
          height: 100,
          margin: "0 auto",
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "@media (max-width: 900px)": {
            width: "20%",
            height: "100%",
          },
        }}
      >
        {name}
      </Card>
      <Box
        sx={{
          width: "95%",
          overflow: "hidden",
          padding: "2px",
          height: "100%",
          marginX: "0 auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            paddingY: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            overflowY: "auto",
            height: "100%",
            backgroundColor: "rgb(245,245,245)",
            borderRadius: "12px",
            paddingX: "12px",
            "@media (max-width: 900px)": {},
          }}
        >
          {todos?.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </Box>
      </Box>
      <Button
        onClick={handleClick}
        sx={{
          boxShadow: "1px 1px 1px transparent",
          color: "rgba(0,0,0,0.3)",
          borderRadius: "26px",
          maxWidth: "52px",
          minWidth: "52px",
          height: "52px",
          padding: "12px",
          fontWeight: 600,
          "&:hover": {
            boxShadow: "1px 1px 1px rgba(0,0,0,0.3)",
            color: "rgba(0,0,0,0.8)",
          },
        }}
      >
        <AddOutlinedIcon />
      </Button>
    </Card>
  );
};

export default Board;
