import { Box } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { motion, AnimatePresence } from "framer-motion";
import useAnimationValues from "../../utils/useAnimationValues";
import AnswerButtons from "./AnswerButtons"; // Import the new component

export default function QuizQuestion({
  question,
  index,
  totalQuestions,
  handleAnswer,
}) {

  const animationValues = useAnimationValues();

  // Determine if the question is true/false by checking the possible answers
  const isTrueFalse =
    question.incorrect_answers.length === 1 &&
    question.incorrect_answers.includes("False") &&
    question.correct_answer === "True";


  return (
    <Box
      component="div"
      sx={{
        p: 2,
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        height: "80vh",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
        + za uzywanie key a nie probe triggerowania w jakichs dziwnych listenerach
          key={index} // Trigger animation when index changes
          initial={{ opacity: 0, x: animationValues.initialX }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: animationValues.exitX }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: 640,
            width: "90%",
            zIndex: 1,
          }}
        >
          <Card sx={{ maxWidth: 640, width: "90%", "--Card-padding": "16px" }}>
            <Box
              component="div"
              sx={{
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                level="title-lg"
                sx={{
                  mt: 1,
                  mb: 1,
                }}
              >
                {index + 1} of {totalQuestions}
              </Typography>
              <Typography
                level="body-md"
                sx={{
                  mb: 1,
                }}
              >
                {question.question}
              </Typography>
            </Box>
            <CardContent orientation="vertical">
            <AnswerButtons
                isTrueFalse={isTrueFalse}
                incorrect_answers={question.incorrect_answers}
                correct_answer={question.correct_answer}
                handleAnswer={handleAnswer}
              />
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
