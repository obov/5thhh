import { Box } from "@mui/material";
import Logo from "../logo/svg";

const Header = () => {
  return (
    <Box
      sx={{
        position: "relative",
        top: -100,
        ".header": {
          position: "absolute",
          height: 100,
          width: "100vw",
          backgroundColor: "#11111f",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          transform: "translateX(-50%)",
          left: "50%",
          alignItems: "center",
          ".logoWrapper": {
            height: 150,
            minWidth: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      }}
    >
      <Box className="header">
        <Box className="logoWrapper">
          <Logo />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
