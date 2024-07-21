export const onQuestionsSliderSelect = (number, setNumQuestions, setSaveQuestionsFlag) => {
    setNumQuestions(number);
    setSaveQuestionsFlag(true);
    sessionStorage.setItem("numQuestions", number);
  };
  