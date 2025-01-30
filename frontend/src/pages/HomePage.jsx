import { useSelector } from "react-redux";
import MyDrawer from "../components/MyDrawer";
import { Box, Toolbar } from "@mui/material";
import MyAppBar from "../components/MyAppBar";
import CategoryGroup from "../components/CategoryGroup";
import MyTable from "../components/MyTable";

function HomePage() {
  const { drawerWidth } = useSelector((state) => state.drawer);

  return (
    <Box sx={{ display: "flex" }}>
      <MyAppBar />
      <MyDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <CategoryGroup />
        <Toolbar />
        <MyTable />
      </Box>
    </Box>
  );
}

export default HomePage;
