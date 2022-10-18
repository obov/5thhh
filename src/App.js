import { Route, Routes } from "react-router-dom";
import Boards from "./pages/Boards";
import Detail from "./pages/Detail";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./components/Layout";
if (process.env.NODE_ENV === "production") {
  console.log = function no_console() {};
  console.warn = function no_console() {};
}
function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route index element={<Boards />} />
          <Route path="/:id" element={<Detail />} />; ;
        </Routes>
      </Layout>
    </>
  );
}

export default App;
