import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../redux/slices/userSlice";

function MyAvatar({ width }) {
  const { user, isLoading, error } = useSelector((state) => state.user);
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(currentUser());
  }, []);

  return (
    <Avatar
      sx={{
        bgcolor: deepPurple[500],
        width: width,
        height: width,
        fontSize: "3rem",
        fontWeight: "bold",
      }}
    >
      {user.username && user.username[0]}
    </Avatar>
  );
}

export default MyAvatar;
