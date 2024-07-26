to mogloby byc wewnatrz componentu/byc przekazane jako props od widoku

export const handleAnswer = (
    answer,
    questions,
    currentQuestionIndex,
    setUserAnswers,
    setCurrentQuestionIndex,
    setQuizCompleted
  ) => {
    setUserAnswers((prevAnswers = []) => {
      const updatedAnswers = prevAnswers.map((userAnswer) =>
        userAnswer.question === questions[currentQuestionIndex]
          ? { question: questions[currentQuestionIndex], answer }
          : userAnswer
      );
  
      if (!updatedAnswers.find(
        (userAnswer) => userAnswer.question === questions[currentQuestionIndex]
      )) {
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
  