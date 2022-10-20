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
        html {
          scroll-behavior: smooth;
        }
        *{
          font-weight:600
        }
        ::-webkit-scrollbar {
          width: 8px; 
          height: 8px;
          display: none;
        }
        ::-webkit-scrollbar-track {
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: rgba(20, 20, 20, 0.3);
          box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.6);
        }


        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
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
        @keyframes boing{
  0%, 100% {
    transform: translateY(0px);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translateY(-30px);
    animation-timing-function: ease-in;
    opacity: 0.5;
  }
  
}
#dot6{
    animation: boing 1s infinite;
}
#dot7{
    animation: boing 1s ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.2s;
}
#dot8{
    animation: boing 1s ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.4s;
}
#dot9{
    animation: boing 1s ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.6s;
}
#dot10{
    animation: boing 1s ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.8s;
}

      `,
    },
  },
});
