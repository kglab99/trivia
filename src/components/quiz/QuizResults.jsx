import { Box } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import { useContext } from "react";
import { QuizContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function QuizResults() {
  const { questions, userAnswers, resetQuiz } = useContext(QuizContext);
  const navigate = useNavigate(); // Create the navigate function

  const correctAnswers = userAnswers.filter(
    (userAnswer) => userAnswer.answer === userAnswer.question.correct_answer
  );
  const incorrectAnswers = userAnswers.filter(
    (userAnswer) => userAnswer.answer !== userAnswer.question.correct_answer
  );

  const handleReload = () => {
    resetQuiz(); // Reset the quiz state
    navigate("/"); // Navigate to the home page
  };

  return (
    <Box
      component="div"
      gap={4}
      sx={{
        p: 2,
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", textAlign: "left", maxWidth: "700px" }}>
        <Typography
          level="h2"
          sx={{
            mb: 2, // Margin-bottom for spacing
            color: "primary.main", // Example color
          }}
        >
          Quiz completed!
        </Typography>

        <Typography
          level="body-md"
          sx={{
            mb: 0, // Margin-bottom for spacing
            color: "primary.main", // Example color
          }}
        >
          You got {correctAnswers.length} out of {questions.length} correct.
        </Typography>
      </Box>

      {correctAnswers.map((userAnswer, index) => (
        <Card
          sx={{ maxWidth: 640, width: "90%", "--Card-padding": "16px" }}
          key={index}
        >
          <Box
            component="div"
            sx={{
              flexDirection: "column",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Typography level="body-md">
              {userAnswer.question.question}
            </Typography>
          </Box>
          <CardContent orientation="vertical">
            <Typography
              startDecorator={<CheckCircleOutlineIcon />}
              level="body-md"
              color="success"
            >
              {userAnswer.question.correct_answer}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {incorrectAnswers.map((userAnswer, index) => (
        <Card
          sx={{ maxWidth: 640, width: "90%", "--Card-padding": "16px" }}
          key={index}
        >
          <Box
            component="div"
            sx={{
              flexDirection: "column",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Typography level="body-md">
              {userAnswer.question.question}
            </Typography>
          </Box>
          <CardContent orientation="vertical">
            <Typography
              color="danger"
              startDecorator={<HighlightOffIcon />}
              level="body-sm"
              sx={{
                mb: 1, // Margin-bottom for spacing
              }}
            >
              {userAnswer.answer}
            </Typography>
            <Divider orientation="horizontal" />
            <Typography
              startDecorator={<CheckCircleOutlineIcon />}
              level="body-md"
              color="success"
              sx={{
                mt: 1, // Margin-top for spacing
              }}
            >
              {userAnswer.question.correct_answer}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Button variant="solid" color="primary" onClick={handleReload}>
        Restart Quiz
      </Button>
    </Box>
  );
}
