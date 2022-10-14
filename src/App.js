import { useState } from "react";
import useAxios from "./hooks/useAxios";
function App() {
  const { data, fetcher, isLoading } = useAxios("http://localhost:3001/posts");
  const handleClick = () => {
    fetcher();
  };

  const [localData, setLocalData] = useState("");
  const { getItem, setItem } = useLocal();
  const handleChange = ({ target }) => {
    setLocalData(target.value);
    setItem("key", localData);
  };
  return (
    <>
      <div onClick={handleClick}>
        {data ? data[0]?.title : isLoading ? "loading" : "nodata"}
      </div>
      <input value={localData} onChange={handleChange} />
    </>
  );
}

export default App;
