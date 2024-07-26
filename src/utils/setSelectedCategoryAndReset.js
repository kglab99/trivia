troche potworka tu stworzyles. 
lepiej by bylo zrobic jakis helper ktory jest generyczny 
i wrapuje useState, np useSessionStorageState i tam sobie te logike zebrac
wtedy w komponencie zamiast
const [selectedCategory, setSelectedCategory] = useState(() => getItem("selectedCategory", true) || null);
bys mial 
const [selectedCategory, setSelectedCategory] = useSessionStorageState('PROPERTY_NAME', 'DEFAULT_VALUE');
duzo czysciej i less coupled (idk jak to po polsku powiedziec xD)
export const setSelectedCategoryAndReset = (
    category,
    setSelectedCategory,
    setNumQuestions,
    setCurrentQuestionIndex,
    setUserAnswers,
    setQuestions,
    setQuestionsReady,
    setSaveQuestionsFlag,
    setQuizCompleted,
    setConfirmed
  ) => {
    sessionStorage.removeItem("questions");
    sessionStorage.removeItem("numQuestions");
    sessionStorage.removeItem("currentQuestionIndex");
    sessionStorage.removeItem("userAnswers");
    sessionStorage.removeItem("quizCompleted");
    sessionStorage.removeItem("quizState");
    sessionStorage.removeItem("quizResults");
  
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
  };
  