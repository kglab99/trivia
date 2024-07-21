import { createContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Categories from "./components/quiz/Categories";
import TopBar from "./components/TopBar";
import NumQuestionsChoice from "./components/quiz/NumQuestionsChoice";
import Quiz from "./components/quiz/Quiz";
import QuizResults from "./components/quiz/QuizResults";
import { useQuizContext } from "./utils/quizContext";

export const QuizContext = createContext();

export default function App() {
  const contextValue = useQuizContext();

  return (
    <QuizContext.Provider value={contextValue}>
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
