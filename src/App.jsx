import { createContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Categories from "./components/quiz/Categories";
import TopBar from "./components/TopBar";
import NumQuestionsChoice from "./components/quiz/NumQuestionsChoice";
import Quiz from "./components/quiz/Quiz";
import QuizResults from "./components/quiz/QuizResults";
za duzo wrzucilesz do utils -> to co tam masz powinno byc serwisami/miec swoje wlasne katalogi
mozesz dzielic ze wzgledu na feature albo domeny, wolna wolna
zamiast utils widzialbym np
./contexts
./utils -> rzeczy ktore nie sa zwiazane stricte z jednym feature
 - sessionStorageUtils
 - useAnimationsValues (to w vue by mialo osobny katalog na consumable, ale nwm jaka jest konwencja w react)
 - arrayUtils.js -> shuffleArray
 - decode.js itd
./services
 - quizService -> tu se wrzuc rzecyz ktore chciales o nich, ale czesc z nich wyglada jakby nie miala potrzeby byc wspoldzielona 
import { useQuizContext } from "./utils/quizContext";
import { shuffleArray } from "./utils/additional";

export const QuizContext = createContext();

export default function App() {
  const contextValue = useQuizContext();

  return (
    <QuizContext.Provider value={contextValue}>
      <Router>
        <TopBar />
        <Routes>
          raczej definicje routes powinny byc w osobnym pliku, wydzielone
          jak tego nie zrobisz to potem przy nested routes bedzie balagan bo bedziesz mial wiele miejsc w projekcie deklarujacych routes
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
