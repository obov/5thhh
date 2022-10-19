import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import useSum from "../hooks/useSum";
import Header from "./Header";

const Layout = ({ children }) => {
  const sum = useSum();
  return (
    <Box
      sx={{
        width: "100vw",
        background: "linear-gradient(-45deg, #9599E2, #FB927E,#F7CE68,#8BC6EC)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        ".container": {
          paddingTop: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "rgba(240,240,240,0.6)",
          gap: "10px",
          height: "100vh",
          minHeight: "800px",
          "@media (max-width: 900px)": {
            height: `calc( max(100vh , 820px) + ${Math.max(0, sum) * 72}px)`,
          },
        },
      }}
    >
      <Container fixed className="container">
        <Header />
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
