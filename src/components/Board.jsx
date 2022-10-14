import Todo from "./Todo";

const Board = ({ type, color }) => {
  const todos = [
    { title: "세계정복", content: "쉬움 ㅇㅇ", type: "todo", id: 0 },
  ];
  return (
    <div>
      <div style={{ backgroundColor: color, width: 100, height: 100 }}>
        {type}
      </div>
      {todos
        .filter((todo) => todo.type === type)
        .map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      <div>추가</div>
    </div>
  );
};

export default Board;
