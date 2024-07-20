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
    handleAnswer,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  } = useContext(QuizContext);

  useEffect(() => {
    const index = parseInt(questionIndex, 10);

    if (Array.isArray(questions) && questions.length > 0) {
      if (index < 0 || index >= questions.length) {
        navigate("/quiz-results");
      } else if (index !== currentQuestionIndex) {
        //handles proper url and question index in case user changes answer by going page back
        setCurrentQuestionIndex(index);
      }
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
      navigate("/quiz-results");
    }
  }, [quizCompleted, navigate]);

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
