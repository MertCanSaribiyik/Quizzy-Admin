import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../redux/slices/categorySlice";
import Loading from "./Loading";
import {
  getAllQuestions,
  getQuestionByCategory,
} from "../redux/slices/questionSlice";
import MySnackbar from "./MySnackbar";

const buttonStyle = {
  width: {
    xs: "160px",
    sm: "200px",
  },
  fontSize: {
    xs: "0.8rem",
    sm: "0.9rem",
  },
  whiteSpace: "nowrap",
};

function CategoryGroup() {
  const { categories, isLoading, error } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  const [alignment, setAlignment] = useState("All");

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <MySnackbar message={error} />;
  } else {
    return (
      <>
        <Box
          sx={{
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              backgroundColor: "action.hover",
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "action.selected",
            },
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            {categories && (
              <>
                <ToggleButton
                  key={"All"}
                  value={"All"}
                  sx={buttonStyle}
                  onClick={() => dispatch(getAllQuestions())}
                >
                  All
                </ToggleButton>
                {categories.map((item) => (
                  <ToggleButton
                    key={item._id}
                    value={item.name}
                    sx={buttonStyle}
                    onClick={() => dispatch(getQuestionByCategory(item._id))}
                  >
                    {item.name}
                  </ToggleButton>
                ))}
              </>
            )}
          </ToggleButtonGroup>
        </Box>
      </>
    );
  }
}

export default CategoryGroup;
