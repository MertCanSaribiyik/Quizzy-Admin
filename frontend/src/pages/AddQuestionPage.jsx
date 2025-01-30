import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Paper,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyFooter from "../components/MyFooter";
import { createQuestion } from "../redux/slices/questionSlice";
import MySnackbar from "../components/MySnackbar";
import MyDialog from "../components/MyDialog";
import { getAllCategories } from "../redux/slices/categorySlice";

function AddQuestionPage() {
  const { categories } = useSelector((state) => state.category);
  const { isLoading, error, message } = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const options = ["A", "B", "C", "D"];

  const [addCategory, setAddCategory] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );

    const body = {
      category_id: formData.category,
      name: formData.questionName,
      answers: [
        formData.optionA,
        formData.optionB,
        formData.optionC,
        formData.optionD,
      ],
      correct_answer: formData.correctOption,
    };

    dispatch(createQuestion(body));
    e.currentTarget.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={3}
          sx={{
            maxWidth: "700px",
            mx: { xs: 2, sm: "auto" },
            my: 4,
            p: { xs: 2, sm: 4 },
          }}
        >
          <Box sx={{ my: 2 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ textAlign: "center", mb: 3 }}
            >
              Select Category :
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Stack
                sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}
              >
                <FormControl fullWidth>
                  <InputLabel id="select-category">Category</InputLabel>
                  <Select
                    labelId="select-category"
                    name="category"
                    id="select-category"
                    label="Category"
                    defaultValue=""
                  >
                    {categories &&
                      categories.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <Button
                  size="large"
                  onClick={() => setAddCategory(!addCategory)}
                >
                  Add Category
                </Button>
              </Stack>

              {/* Question Name */}
              <TextField fullWidth label="Question Name" name="questionName" />

              {/* Options */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                }}
              >
                {options.map((key) => (
                  <TextField
                    key={key}
                    fullWidth
                    label={`Option ${key}`}
                    name={`option${key}`}
                  />
                ))}
              </Box>

              {/* Correct Option Radio Buttons */}
              <FormControl>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, textAlign: "center" }}
                >
                  Correct Option:
                </Typography>
                <RadioGroup
                  row
                  name="correctOption"
                  sx={{ justifyContent: "center", gap: { xs: "1px", sm: 2 } }}
                >
                  {["A", "B", "C", "D"].map((option) => (
                    <FormControlLabel
                      key={option}
                      control={<Radio />}
                      label={option}
                      name="correctOption"
                      value={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              {/* Submit Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                type="submit"
                disabled={isLoading}
              >
                SEND
              </Button>
            </Box>
          </Box>
        </Paper>
        <MyFooter />
      </form>
      {error && <MySnackbar message={error} />}
      {message && <MySnackbar message={message} />}
      {addCategory && <MyDialog open={addCategory} setOpen={setAddCategory} />}
    </>
  );
}

export default AddQuestionPage;
