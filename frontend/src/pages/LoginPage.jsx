import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MyFooter from "../components/MyFooter";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/slices/userSlice";
import MySnackbar from "../components/MySnackbar";

function LoginPage() {
  const { token, isLoading, error, message } = useSelector(
    (state) => state.user
  );
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [process, setProcess] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );

    switch (process) {
      case "login":
        login(username, password);
        break;
      case "register":
        register(username, password);
        break;
      default:
        break;
    }

    e.currentTarget.reset();
  };

  const login = (username, password) => {
    dispacth(loginUser({ username, password }))
      .unwrap()
      .then((response) => {
        localStorage.setItem("token", response.accessToken);
        navigate("/home");
      });
  };

  const register = (username, password) => {
    dispacth(registerUser({ username, password }));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
          }
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90%",
            }}
          >
            <Stack
              spacing={4}
              sx={{
                alignItems: "center",
                width: "100%",
                paddingX: { xs: "2rem" },
              }}
            >
              <Typography variant="h3" component="div">
                Login & Register
              </Typography>
              <FormControl
                variant="standard"
                sx={{ width: { sm: "45ch", xs: "100%" } }}
              >
                <InputLabel htmlFor="admin-name-input">Admin Name</InputLabel>
                <Input
                  id="admin-name-input"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
              <FormControl
                variant="standard"
                sx={{ width: { sm: "45ch", xs: "100%" } }}
              >
                <InputLabel htmlFor="password-input">Password</InputLabel>
                <Input
                  id="password-input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 4,
                  width: { sm: "45ch", xs: "100%" },
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{ width: "50%" }}
                  onClick={() => setProcess("login")}
                >
                  Login
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{ width: "50%" }}
                  onClick={() => setProcess("register")}
                >
                  Register
                </Button>
              </Stack>
            </Stack>
          </Box>

          <MyFooter />
        </Container>
      </form>

      {error && <MySnackbar message={error} />}
      {message && <MySnackbar message={message} />}
    </>
  );
}

export default LoginPage;
