import { useState, createContext, useEffect } from "react";
import Categories from "./components/quiz/Categories";
import TopBar from "./components/TopBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NumQuestionsChoice from "./components/quiz/NumQuestionsChoice";
import useFetchQuestions from "./hooks/useFetchQuestions";
import Quiz from "./components/quiz/Quiz";
import QuizResults from "./components/quiz/QuizResults";

export const QuizContext = createContext({
  onCategorySelect: () => {},
  loading: false,
  setLoading: () => {},
  numQuestions: null,
  selectedCategory: null,
  resetQuiz: () => {},
  setQuestionCount: () => {},
  onQuestionsFetchComplete: () => {},
  questionsFetched: false,
});

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const saved = sessionStorage.getItem("selectedCategory");
    return saved ? JSON.parse(saved) : null;
  });
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [numQuestions, setNumQuestions] = useState(() => {
    const saved = sessionStorage.getItem("numQuestions");
    return saved ? parseInt(saved, 10) : null;
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const saved = sessionStorage.getItem("currentQuestionIndex");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [userAnswers, setUserAnswers] = useState(() => {
    const saved = sessionStorage.getItem("userAnswers");
    return saved ? JSON.parse(saved) : [];
  });
  const [quizCompleted, setQuizCompleted] = useState(() => {
    const saved = sessionStorage.getItem("quizCompleted");
    return saved ? JSON.parse(saved) : false;
  });
  const [questions, setQuestions] = useState(() => {
    const saved = sessionStorage.getItem("questions");
    console.log("Saved:" + saved);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [questionsReady, setQuestionsReady] = useState(false);
  const [saveQuestionsFlag, setSaveQuestionsFlag] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const onQuestionsSliderSelect = (number) => {
    setNumQuestions(number);
    console.log(numQuestions);
    setSaveQuestionsFlag(true);
    sessionStorage.setItem("numQuestions", number);
    console.log("Selected number of questions:", number);
  };

  const setSelectedCategoryAndConsoleLog = (category) => {
    sessionStorage.removeItem("questions");
    sessionStorage.removeItem("numQuestions");
    sessionStorage.removeItem("currentQuestionIndex");
    sessionStorage.removeItem("userAnswers");
    sessionStorage.removeItem("quizCompleted");
    sessionStorage.removeItem("quizState");
    sessionStorage.removeItem("quizResults");
    console.log("Cleared session storage");

    setSelectedCategory(category);
    sessionStorage.setItem("selectedCategory", JSON.stringify(category));

    setNumQuestions(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuestions([]);
    setQuestionsReady(false);
    setSaveQuestionsFlag(false);
    setQuizCompleted(false);
    setConfirmed(false);

    console.log("Selected category:", category);
    console.log("Session storage after setting category:", {
      selectedCategory: sessionStorage.getItem("selectedCategory"),
      numQuestions: sessionStorage.getItem("numQuestions"),
      currentQuestionIndex: sessionStorage.getItem("currentQuestionIndex"),
      userAnswers: sessionStorage.getItem("userAnswers"),
      quizCompleted: sessionStorage.getItem("quizCompleted"),
      questions: sessionStorage.getItem("questions"),
    });
  };

  const setQuestionCount = (number) => {
    setNumQuestions(number);
    sessionStorage.setItem("numQuestions", number);
  };

  const { fetchedQuestions, fetchReady, error } = useFetchQuestions(
    confirmed,
    selectedCategory,
    numQuestions,
    setSaveQuestionsFlag
  );

  useEffect(() => {
    if (fetchedQuestions.length > 0) {
      setQuestions(fetchedQuestions);
    }
  }, [fetchedQuestions]);

  useEffect(() => {
    if (fetchReady) {
      setLoading(false);
    }
  }, [fetchReady]);

  useEffect(() => {
    if (saveQuestionsFlag && numQuestions !== null) {
      if (questions.length > 0) {
        console.log(saveQuestionsFlag);
        sessionStorage.setItem("questions", JSON.stringify(questions));
        setQuestionsReady(true); 
        setSaveQuestionsFlag(false); 
        console.log("Questions fetched:", questions);
      }
    }
  }, [saveQuestionsFlag, numQuestions, questions]);

  const handleAnswer = (answer) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((userAnswer) =>
        userAnswer.question === questions[currentQuestionIndex]
          ? { question: questions[currentQuestionIndex], answer }
          : userAnswer
      );

      if (
        !updatedAnswers.find(
          (userAnswer) =>
            userAnswer.question === questions[currentQuestionIndex]
        )
      ) {
        updatedAnswers.push({
          question: questions[currentQuestionIndex],
          answer,
        });
      }

      return updatedAnswers;
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        sessionStorage.setItem("currentQuestionIndex", newIndex);
        return newIndex;
      });
    } else {
      setQuizCompleted(true);
      sessionStorage.setItem("quizCompleted", true);
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setNumQuestions(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setQuestions([]);
    setQuestionsReady(false);
    setSaveQuestionsFlag(false);
    setConfirmed(false);

    sessionStorage.removeItem("selectedCategory");
    sessionStorage.removeItem("numQuestions");
    sessionStorage.removeItem("currentQuestionIndex");
    sessionStorage.removeItem("userAnswers");
    sessionStorage.removeItem("quizCompleted");
    sessionStorage.removeItem("questions");
    sessionStorage.removeItem("quizState");
    sessionStorage.removeItem("quizResults");
  };

  return (
    <QuizContext.Provider
      value={{
        onQuestionsSliderSelect,
        questions,
        setSelectedCategoryAndConsoleLog,
        loadingCategories,
        setLoadingCategories,
        selectedCategory,
        numQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        loading,
        setLoading,
        handleAnswer,
        quizCompleted,
        confirmed,
        setConfirmed,
        userAnswers,
        setQuestionCount,
        resetQuiz,
        questionsReady,
        setQuestions,
      }}
    >
      <Router>
        <TopBar />
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/num-of-questions" element={<NumQuestionsChoice />} />
          <Route path="/quiz/:questionIndex" element={<Quiz />} />
          <Route path="/quiz-results" element={<QuizResults />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </QuizContext.Provider>
  );
}
