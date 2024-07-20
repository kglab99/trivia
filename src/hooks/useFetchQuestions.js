import { useState, useEffect } from "react";
import { fetchQuestions } from "../logic/fetchQuestions";
import { decodeHTMLEntities, shuffleArray } from "../logic/additional";

export default function useFetchQuestions(confirmed, selectedCategory, numQuestions, fetchQuestionsFlag) {
  const [fetchedQuestions, setQuestions] = useState([]);
  const [fetchReady, setFetchReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetchQuestionsFlag && selectedCategory && numQuestions && confirmed) {
      const fetchData = async () => {
        setFetchReady(false);
        try {
          const data = await fetchQuestions(selectedCategory.id, numQuestions);
          console.log("Fetched data:", data);

          const decodedQuestions = data.results.map(question => {
            const decodedQuestion = decodeHTMLEntities(question.question);
            const decodedCorrectAnswer = decodeHTMLEntities(question.correct_answer);
            const decodedIncorrectAnswers = question.incorrect_answers.map(answer => decodeHTMLEntities(answer));

            return {
              ...question,
              question: decodedQuestion,
              correct_answer: decodedCorrectAnswer,
              incorrect_answers: decodedIncorrectAnswers
            };
          });

          const shuffledQuestions = decodedQuestions.map(question => ({
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
          }));
          
          console.log("Shuffled questions:", shuffledQuestions);

          setQuestions(shuffledQuestions);
        } catch (err) {
          setError(err);
        } finally {
          setFetchReady(true);
        }
      };

      fetchData();
    }
  }, [selectedCategory, numQuestions, fetchQuestionsFlag, confirmed]);

  return { fetchedQuestions, fetchReady, error };
}
