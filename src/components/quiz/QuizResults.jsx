import { useContext, useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../App";
import MotionWrapper from "../../MotionWrapper"; // Import the custom MotionWrapper
import { motion, AnimatePresence } from "framer-motion";

// Create a motion-enabled Button component
const MotionButton = motion(Button);

export default function QuizResults() {
  const { resetQuiz, questions, userAnswers } = useContext(QuizContext);
  const navigate = useNavigate();
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  useEffect(() => {
    // Retrieve results from session storage
    const storedResults = sessionStorage.getItem("quizResults");
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      setCorrectAnswers(parsedResults.correctAnswers);
      setIncorrectAnswers(parsedResults.incorrectAnswers);
    } else {
      // If no results in session storage, calculate them
      const correct = userAnswers.filter(
        (userAnswer) => userAnswer.answer === userAnswer.question.correct_answer
      );
      const incorrect = userAnswers.filter(
        (userAnswer) => userAnswer.answer !== userAnswer.question.correct_answer
      );
      setCorrectAnswers(correct);
      setIncorrectAnswers(incorrect);

      // Store results in session storage
      sessionStorage.setItem(
        "quizResults",
        JSON.stringify({
          correctAnswers: correct,
          incorrectAnswers: incorrect,
        })
      );
    }
  }, [userAnswers]);

  const handleRestart = () => {
    resetQuiz();
    navigate("/");
  };

  return (
    <MotionWrapper>
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
              mb: 2,
              color: "primary.main",
            }}
          >
            Quiz completed!
          </Typography>

          <Typography
            level="body-md"
            sx={{
              mb: 0,
              color: "primary.main",
            }}
          >
            You got {correctAnswers.length} out of {questions.length} correct.
          </Typography>
        </Box>

        {correctAnswers.map((userAnswer, index) => (
          <Card
            sx={{ maxWidth: 640, width: "90%", "--Card-padding": "16px" }}
            key={`correct-${index}`}
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
            key={`incorrect-${index}`}
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

        <MotionButton
          variant="solid"
          color="primary"
          onClick={handleRestart}
          whileHover={{ scale: 1.1, backgroundColor: "#d6d6d6" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          sx={{
            mt: 2,
          }}
        >
          Restart Quiz
        </MotionButton>
      </Box>
    </MotionWrapper>
  );
}
