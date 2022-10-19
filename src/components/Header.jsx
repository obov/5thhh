import { Box } from "@mui/material";
import Logo from "../logo/svg";
import useSum from "../hooks/useSum";

const Header = () => {
  const sum = useSum();
  console.log(sum);
  return (
    <Box sx={{ position: "relative", top: -100 }}>
      <Box
        sx={{
          position: "absolute",
          height: 100,
          width: `calc(100vw - ${
            Math.max(0, sum - 3) || window.innerHeight < 800 ? 8 : 0
          }px)`,
          backgroundColor: "#11111f",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          transform: "translateX(-50%)",
          left: "50%",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            height: 150,
            minWidth: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Logo />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
