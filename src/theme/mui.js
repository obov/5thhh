import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#666666",
      // light: main값을 통해 계산됨
      // dark: main값을 통해 계산됨
      // contrastText: main값을 통해 계산됨
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ::-webkit-scrollbar {
          width: 8px; 
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: rgba(20, 20, 20, 0.3);
          box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.6);
        }
        @keyframes fadeIn{
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `,
    },
  },
});
