import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteQuestion, getAllQuestions } from "../redux/slices/questionSlice";
import Loading from "./Loading";
import MySnackbar from "./MySnackbar";

function MyTable() {
  const { questions, isLoading, error, message } = useSelector(
    (state) => state.question
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllQuestions());
  }, []);

  const questionDelete = (id) => {
    dispatch(deleteQuestion(id))
      .unwrap()
      .then((response) => {
        dispatch(getAllQuestions());
      });
  };

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <MySnackbar message={error} />;
  } else {
    return (
      <>
        <TableContainer
          component={Paper}
          sx={{
            "&::-webkit-scrollbar": {
              backgroundColor: "action.hover",
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "action.selected",
            },
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Delete</TableCell>
                {/* <TableCell>Edit</TableCell> */}
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Question Name</TableCell>
                <TableCell align="right">A</TableCell>
                <TableCell align="right">B</TableCell>
                <TableCell align="right">C</TableCell>
                <TableCell align="right">D</TableCell>
                <TableCell align="right">Correct Asnwer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions &&
                questions.map((item) => (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        sx={{ color: "red" }}
                        onClick={() => questionDelete(item._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    {/* <TableCell>
                      <IconButton aria-label="edit" sx={{ color: "orange" }}>
                        <EditIcon />
                      </IconButton>
                    </TableCell> */}

                    <TableCell component="th" align="right">
                      {item.category_id.name}
                    </TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.answers[0].name}</TableCell>
                    <TableCell align="right">{item.answers[1].name}</TableCell>
                    <TableCell align="right">{item.answers[2].name}</TableCell>
                    <TableCell align="right">{item.answers[3].name}</TableCell>
                    <TableCell align="right">{item.correct_answer}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {message && <MySnackbar message={message} />}
      </>
    );
  }
}

export default MyTable;
