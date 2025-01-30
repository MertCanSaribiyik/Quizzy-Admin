import {
  AppBar,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  useColorScheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { handleDrawerToggle } from "../redux/slices/drawerSlice";
import { useState } from "react";
import {
  filteredQuestions,
  getAllQuestions,
} from "../redux/slices/questionSlice";

function MyAppBar() {
  const { drawerWidth } = useSelector((state) => state.drawer);
  const { questions } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  const { mode, setMode } = useColorScheme();

  const [query, setQuery] = useState("");

  //Input Text filtering :
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const searchQuestion = () => {
    if (query) {
      dispatch(filteredQuestions(query));
    } else {
      dispatch(getAllQuestions());
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(handleDrawerToggle())}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <FormControl
          sx={{
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            flexDirection: "row",
          }}
        >
          <TextField
            onChange={handleInputChange}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
            sx={{ flexBasis: "500px" }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={searchQuestion}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </FormControl>
        <IconButton
          aria-label="theme"
          onClick={() => {
            switch (mode) {
              case "dark":
                setMode("light");
                break;
              case "light":
                setMode("dark");
                break;
            }
          }}
        >
          {mode === "dark" ? <LightModeIcon /> : <ModeNightIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
