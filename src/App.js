import { Route, Routes } from "react-router-dom";
import Boards from "./pages/Boards";
import Detail from "./pages/Detail";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./components/Layout";

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
