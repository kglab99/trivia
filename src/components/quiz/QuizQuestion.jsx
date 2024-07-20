import { Box } from "@mui/joy";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { motion, AnimatePresence } from "framer-motion";

// Create a motion-enabled Button component
const MotionButton = motion(Button);

export default function QuizQuestion({
  question,
  index,
  totalQuestions,
  handleAnswer,
}) {
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
        overflow: "hidden", // Prevent overflow issues during animation
        position: "relative", // Ensure relative positioning for child absolute positioning
      }}
    >
      <AnimatePresence
        mode="wait" // Ensures that the new element waits for the old one to exit
      >
        <motion.div
          key={index} // Trigger animation when index changes
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.1, ease: "easeInOut" }} // Faster transition
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: 640,
            width: "90%",
            zIndex: 1, // Ensure the current question is on top
          }} // Absolute positioning to prevent layout shift
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
              {isTrueFalse ? (
                <>
                  <MotionButton
                    key="true"
                    onClick={() => handleAnswer("True")}
                    whileHover={{ scale: 1.1, backgroundColor: "#e0e0e0" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }} // Faster transition
                    sx={{
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    True
                  </MotionButton>
                  <MotionButton
                    key="false"
                    onClick={() => handleAnswer("False")}
                    whileHover={{ scale: 1.1, backgroundColor: "#e0e0e0" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }} // Faster transition
                    sx={{
                      mt: 0.5,
                      mb: 0.5,
                    }}
                  >
                    False
                  </MotionButton>
                </>
              ) : (
                [...question.incorrect_answers, question.correct_answer].map(
                  (answer, idx) => (
                    <MotionButton
                      key={idx}
                      onClick={() => handleAnswer(answer)}
                      whileHover={{ scale: 1.1, backgroundColor: "#e0e0e0" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.1, ease: "easeInOut" }} // Faster transition
                      sx={{
                        mt: 0.5,
                        mb: 0.5,
                      }}
                    >
                      {answer}
                    </MotionButton>
                  )
                )
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
