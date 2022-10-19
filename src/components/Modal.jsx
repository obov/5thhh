import { Box } from "@mui/material";
import Portal from "./Portal";

const Modal = ({ portal, ...rest }) => {
  const modalBackGround = () => (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        position: "fixed",
        top: 0,
        left: 0,
        backdropFilter: "blur(3px)",
      }}
      {...rest}
    />
  );
  return portal ? <Portal>{modalBackGround()}</Portal> : modalBackGround();
};

export default Modal;
