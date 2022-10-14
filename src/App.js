import { Route, Routes } from "react-router-dom";
import Boards from "./pages/Boards";
import Detail from "./pages/Detail";

function App() {
  return (
    <Routes>
      <Route index element={<Boards />} />
      <Route path="/:id" element={<Detail />} />; ;
    </Routes>
  );
}

export default App;
