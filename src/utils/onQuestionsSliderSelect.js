to 100% powinno byc wewnatrz componentu/widoku

export const onQuestionsSliderSelect = (number, setNumQuestions, setSaveQuestionsFlag) => {
    setNumQuestions(number);
    setSaveQuestionsFlag(true);
    sessionStorage.setItem("numQuestions", number);
  };
