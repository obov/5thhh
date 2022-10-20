import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Plus = ({ iconClassName, ...props }) => {
  return (
    <Button {...props}>
      <AddOutlinedIcon className={iconClassName} />
    </Button>
  );
};

const RightArrow = ({ iconClassName, ...props }) => {
  return (
    <Button {...props}>
      <KeyboardArrowRightIcon className={iconClassName} />
    </Button>
  );
};

const LeftArrow = ({ iconClassName, ...props }) => {
  return (
    <Button {...props}>
      <KeyboardArrowLeftIcon className={iconClassName} />
    </Button>
  );
};
const Edit = ({ iconClassName, ...props }) => {
  return (
    <Button {...props}>
      <EditIcon className={iconClassName} />
    </Button>
  );
};

const Delete = ({ iconClassName, ...props }) => {
  return (
    <Button {...props}>
      <DeleteIcon className={iconClassName} />
    </Button>
  );
};
const btnFather = { Delete, Edit, LeftArrow, RightArrow, Plus };
export default btnFather;
