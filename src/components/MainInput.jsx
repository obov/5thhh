import { useState } from "react";

const MainInput = () => {
  const [newTodo, setNewTodo] = useState({ title: "", content: "" });
  const handleChangeTitle = ({ target }) => {
    const copyTodo = { ...newTodo };
    copyTodo.title = target.value;
    setNewTodo(copyTodo);
  };
  // const handleChangeContent = ({ target }) => {
  //   const copyTodo = { ...newTodo };
  //   copyTodo.content = target.value;
  //   setNewTodo(copyTodo);
  // };
  return (
    <div>
      <input value={newTodo.title} onChange={handleChangeTitle} />
    </div>
  );
};

export default MainInput;
