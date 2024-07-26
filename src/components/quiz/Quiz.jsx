import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import { QuizContext } from "../../App";

const Quiz = () => {
  const navigate = useNavigate();
  const { questionIndex } = useParams();

  uwazaj z definiowaniem wszystkiego w contexcie, 
  state powinien byc tak lokalny jak tylko moze byc
  moze to byl dobry pomysl/moze nie ciezko mi tak z boku powiedziec
  ale po prostu pamietaj zeby nie pchac wszystkiego na pale do globalnego store/contextu
  const {
    quizCompleted,
    questions = [],
    handleAnswer,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  } = useContext(QuizContext);
  const index = parseInt(questionIndex, 10);

  useEffect(() => {
    to mogloby byc w jakims guardzie w routerze ale nie musi
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
    index,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  ]);

  useEffect(() => {
    if (quizCompleted) {
      navigate("/quiz-results");
    }
  }, [quizCompleted, navigate]);

  const question = questions[index] || null;

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
