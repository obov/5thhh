import Board from "../components/Board";
import Layout from "../components/Layout";
import MainInput from "../components/MainInput";

const Boards = () => {
  return (
    <Layout>
      <MainInput />
      <div style={{ display: "flex" }}>
        <Board type="todo" color="salmon" />
        <Board type="ing" color="gold" />
        <Board type="done" color="skyblue" />
        <Board type="defer" color="chocolate" />
      </div>
    </Layout>
  );
};

export default Boards;
