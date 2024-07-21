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
  };
  