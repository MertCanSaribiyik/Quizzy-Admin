import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { resetQuestionMessage } from "../redux/slices/questionSlice";
import { resetUserMessage } from "../redux/slices/userSlice";
import { resetCategoryMessage } from "../redux/slices/categorySlice";

function MySnackbar({ message }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    dispatch(resetQuestionMessage());
    dispatch(resetUserMessage());
    dispatch(resetCategoryMessage());
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}

export default MySnackbar;
