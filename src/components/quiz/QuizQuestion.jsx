import { Box } from "@mui/joy";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { motion, AnimatePresence } from "framer-motion";

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
          initial={{ opacity: 0, scale: 0.97 }} // Slightly smaller and transparent
          animate={{ opacity: 1, scale: 1 }} // Scale to full size and fully opaque
          exit={{ opacity: 0, scale: 0.97 }} // Scale down and fade out
          transition={{ 
            duration: 0.4, 
            ease: "easeInOut" // Simple easing function for smooth transitions
          }} // Smooth transition
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
                  <Button
                    key="true"
                    onClick={() => handleAnswer("True")}
                    sx={{
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    True
                  </Button>
                  <Button
                    key="false"
                    onClick={() => handleAnswer("False")}
                    sx={{
                      mt: 0.5,
                      mb: 0.5,
                    }}
                  >
                    False
                  </Button>
                </>
              ) : (
                [...question.incorrect_answers, question.correct_answer].map(
                  (answer, idx) => (
                    <Button
                      key={idx}
                      onClick={() => handleAnswer(answer)}
                      sx={{
                        mt: 0.5,
                        mb: 0.5,
                      }}
                    >
                      {answer}
                    </Button>
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
