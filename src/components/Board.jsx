import { Box, Button, Card } from "@mui/material";
import { fontGrid } from "@mui/material/styles/cssUtils";
import Todo from "./Todo";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useSelector } from "react-redux";
const Board = ({ type, color, todos }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: "1",
        padding: "16px",
        borderRadius: "24px",
        gap: "16px",
      }}
    >
      <Card
        sx={{
          backgroundColor: color,
          width: "100%",
          height: 100,
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {type}
      </Card>
      {todos?.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
      <Button
        sx={{
          boxShadow: "1px 1px 1px transparent",
          color: "rgba(0,0,0,0.3)",
          borderRadius: "20px",
          padding: "12px",
          fontWeight: 600,
          "&:hover": {
            boxShadow: "1px 1px 1px rgba(0,0,0,0.3)",
            color: "rgba(0,0,0,0.8)",
          },
        }}
      >
        <AddOutlinedIcon />
        추가
      </Button>
    </Card>
  );
};

export default Board;
