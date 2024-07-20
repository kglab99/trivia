import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import { QuizContext } from "../../App";

const Quiz = () => {
  const navigate = useNavigate();
  const { questionIndex } = useParams();
  const {
    quizCompleted,
    questions = [], // Default to empty array if undefined
    loading,
    handleAnswer,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  } = useContext(QuizContext);

  // Load quiz state from session storage on component mount
  useEffect(() => {
    const savedState = sessionStorage.getItem("quizState");
    console.log("Saved State from sessionStorage:", savedState);
    if (savedState) {
      const state = JSON.parse(savedState);
      console.log("Parsed State:", state);
      // Restore state if valid
      if (Array.isArray(state.questions)) {
        // Restore relevant state
        setCurrentQuestionIndex(state.currentQuestionIndex);
        // Restore questions only if they are not already loaded
        if (questions.length === 0) {
          console.log("Restoring questions from saved state.");
          // Assuming questions are already restored from session storage in `App`
        }
      }
    }
  }, [setCurrentQuestionIndex, questions]);

  // Save quiz state to session storage whenever state changes
  useEffect(() => {
    if (!quizCompleted) {
      const state = {
        currentQuestionIndex,
        questions,
      };
      console.log("Saving State to sessionStorage:", state);
      sessionStorage.setItem("quizState", JSON.stringify(state));
    }
  }, [currentQuestionIndex, questions, quizCompleted]);

  useEffect(() => {
    const index = parseInt(questionIndex, 10);

    if (Array.isArray(questions) && questions.length > 0) {
      if (index < 0 || index >= questions.length) {
        navigate("/quiz-results");
      } else if (index !== currentQuestionIndex) {
        setCurrentQuestionIndex(index);
      }
    } else {
      console.error(
        "Questions are not available or invalid. Questions:",
        questions,
        currentQuestionIndex
      );
      setTimeout(navigate("/quiz/0"), 3000);
    }
  }, [
    questions,
    questionIndex,
    navigate,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  ]);

  useEffect(() => {
    if (quizCompleted) {
      sessionStorage.removeItem("quizState");
      navigate("/quiz-results");
    }
  }, [quizCompleted, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const index = parseInt(questionIndex, 10) || 0;
  const question = Array.isArray(questions) ? questions[index] : null;

  const handleAnswerWrapped = (answer) => {
    handleAnswer(answer);
    if (index < questions.length - 1) {
      navigate(`/quiz/${index + 1}`);
    } else if (quizCompleted) {
      navigate("/quiz-results");
    }
  };

  // Debugging logs
  console.log("questions:", questions);
  console.log("questionIndex:", questionIndex);
  console.log("currentQuestionIndex:", currentQuestionIndex);
  console.log("question:", question);

  return (
    <QuizQuestion
      question={question}
      index={currentQuestionIndex}
      totalQuestions={Array.isArray(questions) ? questions.length : 0}
      handleAnswer={handleAnswerWrapped}
    />
  );
};

export default Quiz;
