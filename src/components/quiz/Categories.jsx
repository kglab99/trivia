import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/joy";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import { KeyboardArrowRight } from "@mui/icons-material";
import Divider from "@mui/joy/Divider";
import { motion, AnimatePresence } from "framer-motion";
import { QuizContext } from "../../App";
import MotionWrapper from "../../style/MotionWrapper";
import CustomMotionButton from "../../style/MotionButton"; // Import CustomMotionButton
import { fetchCategories } from "../../fetch/fetchCategories";

const MotionListItemButton = motion(ListItemButton);

export default function Categories() {
  const navigate = useNavigate();
  const { currentQuestionIndex, setSelectedCategoryAndReset, quizCompleted } =
    useContext(QuizContext);

  const [categories, setCategories] = useState([]);
  const [quizInProgress, setQuizInProgress] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const storedCategories = localStorage.getItem("categories");
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        } else {
          const categories = await fetchCategories();
          setCategories(categories);
          localStorage.setItem("categories", JSON.stringify(categories));
        }
      } catch (error) {
        console.error("Failed to load categories. Please try again.");
      }
    };

    loadCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategoryAndReset(category);
    navigate("/num-of-questions");
  };

  useEffect(() => {
    if (!quizCompleted && currentQuestionIndex > 0) {
      setQuizInProgress(true);
    }
  }, [quizCompleted, currentQuestionIndex]);

  const handleResumeQuiz = () => {
    if (currentQuestionIndex >= 0) {
      navigate(`/quiz/${currentQuestionIndex}`);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <MotionWrapper>
        <Box
          component="div"
          sx={{
            p: 2,
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
          }}
        >
          {quizInProgress && (
            <CustomMotionButton
              onClick={handleResumeQuiz}
              size="md"
              variant="outlined"
              sx={{
                mt: 0,
                mb: 2,
                backgroundColor: "primary.main",
              }}
            >
              Go back to quiz
            </CustomMotionButton>
          )}

          <Box sx={{ maxWidth: "700px", width: "100%", textAlign: "left" }}>
            <Typography
              level="h2"
              sx={{
                mb: 2,
                color: "primary.main",
              }}
            >
              Choose category
            </Typography>
          </Box>

          <Box sx={{ maxWidth: "700px", width: "100%" }}>
            <List
              sx={{
                "--ListItem-paddingY": "16px",
              }}
            >
              {categories.map((category) => (
                <div key={category.id}>
                  <MotionListItemButton
                    onClick={() => handleCategorySelect(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <ListItemContent>{category.name}</ListItemContent>
                    <KeyboardArrowRight />
                  </MotionListItemButton>
                  <Divider orientation="horizontal" />
                </div>
              ))}
            </List>
          </Box>
        </Box>
      </MotionWrapper>
    </AnimatePresence>
  );
}
