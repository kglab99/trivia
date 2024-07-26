import { useState, useEffect, useContext } from "react";
import Box from "@mui/joy/Box";
import Slider from "@mui/joy/Slider";
import { Typography } from "@mui/joy";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../App";
import Loading from "../Loading";
import { AnimatePresence } from "framer-motion";
import MotionWrapper from "../../style/MotionWrapper"; // Import the custom MotionWrapper
import { fetchQuestionCount } from "../../fetch/fetchQuestionCount"; // Import the fetch function

export default function NumQuestionsChoice() {
  const {
    onQuestionsSliderSelect,
    selectedCategory,
    questionsReady,
    loading,
    setLoading,
    setConfirmed,
  } = useContext(QuizContext);

  const [questionsCount, setQuestionsCount] = useState(10);
  const [maxQuestions, setMaxQuestions] = useState(10);
  const [readyToFetch, setReadyToFetch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory) {
      const loadQuestionCount = async () => {
        try {
          const totalQuestions = await fetchQuestionCount(selectedCategory.id);
          const maxQuestionCount = Math.min(50, totalQuestions);
          setMaxQuestions(maxQuestionCount);
        } catch (error) {
          console.error("Failed to load question count.");
        }
      };

      skad wziales boie 3000?
      co jeslti fetchQuestionCount zajmie 4000ms?
      to jest zwyklye async await na loadQuestionCount i potem masz to swoje setReadyToFetch
      czyli 
      useEffect(async () => {
        await loadQuestionCount();
        setReadyToFetch(true);
      })
      loadQuestionCount();
      setTimeout(() => {
        setReadyToFetch(true);
      }, 3000);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (questionsReady && !loading) {
      navigate(`/quiz/0`);
    }
  }, [questionsReady, loading, navigate]);

  const handleChange = (event, value) => {
    setQuestionsCount(value);
  };

  const handleSelect = () => {
    onQuestionsSliderSelect(questionsCount);
    setLoading(true);
  };

  useEffect(() => {
    if (readyToFetch) {
      setConfirmed(true);
    }
  }, [readyToFetch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <AnimatePresence mode="wait">
      {!loading && (
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
                maxWidth: "680px",
                width: "90%",
                "& .MuiSlider-thumb": {
                  backgroundColor: "primary",
                },
                "& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible, & .MuiSlider-thumb.Mui-active":
                  {},
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
        </MotionWrapper>
      )}
    </AnimatePresence>
  );
}
