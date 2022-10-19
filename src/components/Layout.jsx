import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import useSum from "../hooks/useSum";
import Header from "./Header";

const Layout = ({ children }) => {
  const sum = useSum();
  return (
    <Box
      sx={{
        width: `calc(100vw - ${
          (Math.max(0, sum - 3) || window.innerHeight < 800) && 8
        }px)`,
        backgroundColor: "rgba(200,200,200,0.7)",
      }}
    >
      <Container
        fixed
        sx={{
          paddingTop: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "rgb(240,240,240)",
          gap: "10px",
          height: "100vh",
          minHeight: "800px",
          "@media (max-width: 900px)": {
            height: `calc( max(100vh , 800px) + ${
              Math.max(0, sum - 1) * 80
            }px)`,
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
