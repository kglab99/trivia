export const onQuestionsSliderSelect = (number, setNumQuestions, setSaveQuestionsFlag) => {
    setNumQuestions(number);
    console.log(number);
    setSaveQuestionsFlag(true);
    sessionStorage.setItem("numQuestions", number);
    console.log("Selected number of questions:", number);
  };
  