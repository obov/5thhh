import Container from "@mui/material/Container";
import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <Container
      fixed
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
