import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/joy";
import Box from "@mui/joy/Box"; // Use Box from @mui/joy
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import { KeyboardArrowRight } from "@mui/icons-material";
import Divider from "@mui/joy/Divider";
import { useContext } from "react";
import { QuizContext } from "../../App";
import Button from "@mui/joy/Button";

export default function Categories() {
  const navigate = useNavigate();
  const {
    currentQuestionIndex,
    setSelectedCategoryAndConsoleLog,
    loadingCategories,
    setLoadingCategories,
    quizCompleted,
  } = useContext(QuizContext);
  const [categories, setCategories] = useState([]);
  const [quizInProgress, setQuizInProgress] = useState(false);
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories);
        setLoadingCategories(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      });
  }, [setLoadingCategories]);

  const handleCategorySelect = (category) => {
    setSelectedCategoryAndConsoleLog(category);
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
        <Button
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
        </Button>
      )}

      <Box sx={{ width: "70%", textAlign: "left" }}>
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
              <ListItem>
                <ListItemButton onClick={() => handleCategorySelect(category)}>
                  <ListItemContent>{category.name}</ListItemContent>
                  <KeyboardArrowRight />
                </ListItemButton>
              </ListItem>
              <Divider orientation="horizontal" />
            </div>
          ))}
        </List>
      </Box>
    </Box>
  );
}
