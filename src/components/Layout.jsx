import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import Header from "./Header";

const Layout = ({ children }) => {
  const todos = useSelector((state) => state.todos);
  const phases = JSON.parse(process.env.REACT_APP_PHASES);
  let sum = 0;
  for (let phase of phases) {
    if (Math.min(todos[phase.num].length - 2, 3) > 0) {
      sum += Math.min(todos[phase.num].length - 2, 3);
    }
  }
  return (
    <Box
      sx={{
        width: `calc(100vw - ${Math.max(0, sum - 3) && 8}px)`,
        backgroundColor: "rgba(200,200,200,0.7)",
      }}
    >
      <Container
        fixed
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "rgb(240,240,240)",
          gap: "10px",
          height: "100vh",
          boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
          "@media (max-width: 900px)": {
            height: `${100 + Math.max(0, sum - 3) * 7}vh`,
          },
        }}
      >
        <Header />
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
