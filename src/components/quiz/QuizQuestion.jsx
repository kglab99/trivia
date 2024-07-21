import { useState, useEffect } from "react";
import { Box } from "@mui/joy";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { motion, AnimatePresence } from "framer-motion";
import CustomMotionButton from "../../MotionButton";

// Create a motion-enabled Button component
const MotionButton = motion(Button);

export default function QuizQuestion({
  question,
  index,
  totalQuestions,
  handleAnswer,
}) {
  const [animationValues, setAnimationValues] = useState({ initialX: 1000, exitX: -1000 });

  useEffect(() => {
    const updateAnimationValues = () => {
      if (window.innerWidth <= 600) { // Mobile width threshold
        setAnimationValues({ initialX: 500, exitX: -500 });
      } else {
        setAnimationValues({ initialX: 1000, exitX: -1000 });
      }
    };

    // Update animation values on component mount
    updateAnimationValues();

    // Add event listener to update animation values on screen resize
    window.addEventListener("resize", updateAnimationValues);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", updateAnimationValues);
  }, []);

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
        mode="popLayout" // Ensures that the new element waits for the old one to exit
      >
        <motion.div
          key={index} // Trigger animation when index changes
          initial={{ opacity: 0, x: animationValues.initialX }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: animationValues.exitX }}
          transition={{ duration: 0.4, ease: "easeInOut" }} // Faster transition
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
                  <CustomMotionButton
                    key={"true"}
                    onClick={() => handleAnswer("True")}
                  >
                    True
                  </CustomMotionButton>
                  <CustomMotionButton
                    key={"false"}
                    onClick={() => handleAnswer("False")}
                  >
                    False
                  </CustomMotionButton>
                </>
              ) : (
                [...question.incorrect_answers, question.correct_answer].map(
                  (answer, idx) => (
                    <CustomMotionButton
                      key={idx}
                      onClick={() => handleAnswer(answer)}
                    >
                      {answer}
                    </CustomMotionButton>
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
