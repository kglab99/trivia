import { useState, useEffect } from "react";
import { fetchQuestions } from "../logic/fetchQuestions";
import { decodeHTMLEntities } from "../logic/additional";

export default function useFetchQuestions(
  confirmed,
  selectedCategory,
  numQuestions,
) {
  const [fetchedQuestions, setQuestions] = useState([]);
  const [fetchReady, setFetchReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCategory && numQuestions && confirmed) {
      const fetchData = async () => {
        setFetchReady(false);
        try {
          const data = await fetchQuestions(selectedCategory.id, numQuestions);

          const decodedQuestions = data.results.map((question) => {
            const decodedQuestion = decodeHTMLEntities(question.question);
            const decodedCorrectAnswer = decodeHTMLEntities(
              question.correct_answer
            );
            const decodedIncorrectAnswers = question.incorrect_answers.map(
              (answer) => decodeHTMLEntities(answer)
            );

            return {
              question: decodedQuestion,
              correct_answer: decodedCorrectAnswer,
              incorrect_answers: decodedIncorrectAnswers,
            };
          });

          setQuestions(decodedQuestions);
        } catch (err) {
          setError(err);
        } finally {
          setFetchReady(true);
        }
      };

      fetchData();
    }
  }, [selectedCategory, numQuestions, confirmed]);

  return { fetchedQuestions, fetchReady, error };
}