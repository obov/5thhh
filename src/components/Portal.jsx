import ReactDOM from "react-dom";
const Portal = ({ children }) => {
  const modalElement = document.querySelector("#modal");
  return ReactDOM.createPortal(children, modalElement);
};

export default Portal;
