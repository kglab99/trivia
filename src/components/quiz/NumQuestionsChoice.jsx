import { useState, useEffect, useContext } from "react";
import Box from "@mui/joy/Box";
import Slider from "@mui/joy/Slider";
import { Typography } from "@mui/joy";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../App";
import Loading from "../Loading";

export default function NumQuestionsChoice() {
  const {
    onQuestionsSliderSelect,
    selectedCategory,
    setQuestionCount,
    setQuestions,
    setQuestionsFetched,
    questionsFetched,
    questions,
    loading,
    setLoading,
    confirmed,
    setConfirmed,
  } = useContext(QuizContext);

  const [questionsCount, setQuestionsCount] = useState(10);
  const [maxQuestions, setMaxQuestions] = useState(10);
  const [readyToFetch, setReadyToFetch] = useState(false);
  //Api limits to 5 seconds before allowing next fetch
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory) {
      const fetchQuestionCount = async () => {
        try {
          const response = await fetch(
            `https://opentdb.com/api_count.php?category=${selectedCategory.id}`
          );
          const data = await response.json();
          const totalQuestions =
            data.category_question_count.total_question_count;
          const effectiveQuestionCount = Math.min(50, totalQuestions);
          setMaxQuestions(effectiveQuestionCount);
        } catch (error) {
          console.error("Error fetching question count:", error);
        }
      };

      fetchQuestionCount();
      setTimeout(() => {
        setReadyToFetch(true);
        console.log("dupa");
      }, 5100);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (questionsFetched && !loading) {
      navigate(`/quiz/0`);
    }
  }, [questionsFetched, loading, navigate]);

  const handleChange = (event, value) => {
    setQuestionsCount(value);
  };

  const handleSelect = () => {
    onQuestionsSliderSelect(questionsCount);
    setLoading(true);
  };

  useEffect(() => {
    if (readyToFetch) {
      console.log("dupa");
      setConfirmed(true);
    }
  }),
    [readyToFetch];

  if (!selectedCategory) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!loading) {
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
        <Box sx={{ maxWidth: "700px", width: "100%", textAlign: "left" }}>
          <Typography
            level="h2"
            sx={{
              mb: 2,
              color: "primary.main",
            }}
          >
            Choose Number of Questions
          </Typography>
        </Box>
        <Slider
          size="lg"
          color="primary"
          variant="soft"
          defaultValue={10}
          min={10}
          max={maxQuestions}
          step={1}
          onChange={handleChange}
          value={questionsCount}
          sx={{
            maxWidth: "700px",
            width: "85%",
          }}
        />
        <Typography
          level="h2"
          sx={{
            mb: 2,
            color: "primary.main",
            mt: 2,
          }}
        >
          {questionsCount}
        </Typography>
        <Button
          onClick={handleSelect}
          size="lg"
          variant="solid"
          sx={{
            mt: 2,
            backgroundColor: "primary.main",
          }}
        >
          Confirm
        </Button>
      </Box>
    );
  }
}
