import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
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
          height: "100vh",
          backgroundColor: "rgb(240,240,240)",
          gap: "10px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
        }}
      >
        <Header />
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
