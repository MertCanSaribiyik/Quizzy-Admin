import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import PersonIcon from "@mui/icons-material/Person";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MyAvatar from "./MyAvatar";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDrawerClose,
  handleDrawerTransitionEnd,
} from "../redux/slices/drawerSlice";
import { useNavigate } from "react-router-dom";

function MyDrawer() {
  const { drawerWidth, mobileOpen } = useSelector((state) => state.drawer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setIcon = (item) => {
    if (item === "Profile") {
      return <PersonIcon />;
    } else if (item === "Add Question") {
      return <QuestionMarkIcon />;
    } else {
      return <ExitToAppIcon />;
    }
  };

  const setOnClick = (item) => {
    switch (item) {
      case "Profile":
        navigate("/profile");
        break;
      case "Add Question":
        navigate("/addQuestion");
        break;
      case "Quit":
        localStorage.setItem("token", "");
        navigate("/");
        break;
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MyAvatar width={"150px"} />
      </Box>
      <Toolbar />
      <List>
        {["Profile", "Add Question", "Quit"].map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={() => setOnClick(item)}>
              <ListItemIcon>{setIcon(item)}</ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={() => dispatch(handleDrawerTransitionEnd())}
        onClose={() => dispatch(handleDrawerClose())}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { sm: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default MyDrawer;
