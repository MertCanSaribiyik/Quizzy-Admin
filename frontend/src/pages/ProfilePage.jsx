import {
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyAvatar from "../components/MyAvatar";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function ProfilePage() {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const editBtn = () => {
    if (isEdit) {
      const adminName = document.getElementById("admin-name-change").value;
      const oldPassword = document.getElementById("old-password").value;
      const newPassword = document.getElementById("new-password").value;

      if (oldPassword === localStorage.getItem("password")) {
        localStorage.setItem("adminName", adminName);
        localStorage.setItem("password", newPassword);
      }
    }

    setIsEdit(!isEdit);
  };

  return (
    <Box
      height={"100vh"}
      padding={3}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        gap={{ xs: 4, sm: 8 }}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <MyAvatar width={"200px"} />

        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          {isEdit ? (
            <>
              <FormControl variant="standard" sx={{ mb: "10px" }}>
                <TextField
                  type="text"
                  id="admin-name-change"
                  label="Change Name"
                  variant="outlined"
                />
              </FormControl>
              <FormControl variant="standard" sx={{ mb: "10px" }}>
                <TextField
                  type={showPassword ? "text" : "password"}
                  id="old-password"
                  label="Old Password"
                  variant="outlined"
                />
              </FormControl>
              <FormControl variant="standard" sx={{ mb: "10px" }}>
                <TextField
                  type={showPassword ? "text" : "password"}
                  id="new-password"
                  label="New Password"
                  variant="outlined"
                />
              </FormControl>
            </>
          ) : (
            <>
              <Typography fontSize={"1.2rem"}>
                Admin Name : {localStorage.getItem("adminName")}{" "}
              </Typography>
              <Typography fontSize={"1.2rem"}>
                Password :{" "}
                {"*".repeat(localStorage.getItem("password")?.length || 0)}
              </Typography>
            </>
          )}

          <Box display={"flex"} gap={2} mt={3}>
            <Button onClick={editBtn} variant="contained" size="large">
              {isEdit ? "Ok" : "Edit"}
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                navigate("/home");
              }}
            >
              Back
            </Button>
            {isEdit && (
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilePage;
