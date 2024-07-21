import { useMemo } from "react";
import CustomMotionButton from "../../style/MotionButton";
import {shuffleArray} from "../../utils/additional"

const AnswerButtons = ({ isTrueFalse, incorrect_answers, correct_answer, handleAnswer }) => {
  const answerButtons = useMemo(() => {
    if (isTrueFalse) {
      return (
        <>
          <CustomMotionButton key="true" onClick={() => handleAnswer("True")}>
            True
          </CustomMotionButton>
          <CustomMotionButton key="false" onClick={() => handleAnswer("False")}>
            False
          </CustomMotionButton>
        </>
      );
    }

    // Shuffle answers if it's not a true/false question
    const answers = shuffleArray([...incorrect_answers, correct_answer]);

    return answers.map((answer) => (
      <CustomMotionButton key={answer} onClick={() => handleAnswer(answer)}>
        {answer}
      </CustomMotionButton>
    ));
  }, [isTrueFalse, incorrect_answers, correct_answer, handleAnswer]);

  return <>{answerButtons}</>;
};

export default AnswerButtons;
