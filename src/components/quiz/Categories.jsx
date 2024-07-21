import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/joy";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import { KeyboardArrowRight } from "@mui/icons-material";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import { motion, AnimatePresence } from "framer-motion";
import { QuizContext } from "../../App";
import MotionWrapper from "../../MotionWrapper"; // Import the custom MotionWrapper

// Create motion-enabled components
const MotionButton = motion(Button);
const MotionListItemButton = motion(ListItemButton);

export default function Categories() {
  const navigate = useNavigate();
  const {
    currentQuestionIndex,
    setSelectedCategoryAndReset,
    loadingCategories,
    setLoadingCategories,
    quizCompleted,
  } = useContext(QuizContext);

  const [categories, setCategories] = useState([]);
  const [quizInProgress, setQuizInProgress] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        setCategories(data.trivia_categories);
        localStorage.setItem(
          "categories",
          JSON.stringify(data.trivia_categories)
        );
        setLoadingCategories(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      }
    };

    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
      setLoadingCategories(false);
    } else {
      setLoadingCategories(true);
      fetchCategories();
    }
  }, [setLoadingCategories]);

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
    <AnimatePresence
      mode="wait" // Ensures that the new element waits for the old one to exit
    >
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
            <MotionButton
              onClick={handleResumeQuiz}
              size="md"
              variant="outlined"
              whileHover={{ scale: 1.1, backgroundColor: "#e0e0e0" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              sx={{
                mt: 0,
                mb: 2,
                backgroundColor: "primary.main",
              }}
            >
              Go back to quiz
            </MotionButton>
          )}

          <Box sx={{ maxWidth: "700px", width: "100%", textAlign: "left" }}>
            {!loadingCategories && (
              <Typography
                level="h2"
                sx={{
                  mb: 2, // Margin-bottom for spacing
                  color: "primary.main", // Example color
                }}
              >
                Choose category
              </Typography>
            )}
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
