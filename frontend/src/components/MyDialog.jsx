import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../redux/slices/categorySlice";
import { TextField } from "@mui/material";
import { Fragment, useState } from "react";
import Loading from "./Loading";
import MySnackbar from "./MySnackbar";

function MyDialog({ open, setOpen }) {
  const { isloading, error, message } = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const addCategory = () => {
    console.log(categoryName);
    dispatch(createCategory({ name: categoryName }));
  };

  return (
    <>
      <Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Create Category"}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="caregory"
              label="Category"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                addCategory();
                handleClose();
              }}
              autoFocus
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
      {isloading && <Loading />}
      {error && <MySnackbar message={error} />}
      {message && <MySnackbar message={message} />}
    </>
  );
}

export default MyDialog;
