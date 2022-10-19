import { useSelector } from "react-redux";
const useSum = () => {
  const todos = useSelector((state) => state.todos);
  const phases = JSON.parse(process.env.REACT_APP_PHASES);
  let sum = 0;
  for (let phase of phases) {
    if (Math.min(todos[phase.num].length - 2, 3) > 0) {
      sum += Math.min(todos[phase.num].length - 2, 3);
    }
  }
  return sum;
};

export default useSum;
