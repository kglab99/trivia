// useQuizContext.js
import { useState, useEffect } from 'react';
import { getItem, setItem, clearAll } from './sessionStorageUtils';
import { handleAnswer } from './handleAnswer';
import { setSelectedCategoryAndReset } from './setSelectedCategoryAndReset';
import { onQuestionsSliderSelect } from './onQuestionsSliderSelect';
import useFetchQuestions from '../hooks/useFetchQuestions';

export const useQuizContext = () => {
  const [selectedCategory, setSelectedCategory] = useState(() => getItem("selectedCategory", true) || null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [numQuestions, setNumQuestions] = useState(() => getItem("numQuestions") || null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => getItem("currentQuestionIndex") || 0);
  const [userAnswers, setUserAnswers] = useState(() => getItem("userAnswers", true) || []);
  const [quizCompleted, setQuizCompleted] = useState(() => getItem("quizCompleted", true) || false);
  const [questions, setQuestions] = useState(() => getItem("questions", true) || []);

  const [questionsReady, setQuestionsReady] = useState(false);
  const [saveQuestionsFlag, setSaveQuestionsFlag] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const { fetchedQuestions, fetchReady, error } = useFetchQuestions(
    confirmed,
    selectedCategory,
    numQuestions,
    setSaveQuestionsFlag
  );

  useEffect(() => {
    if (fetchedQuestions.length > 0) {
      setQuestions(fetchedQuestions);
    }
  }, [fetchedQuestions]);

  useEffect(() => {
    if (fetchReady) {
      setLoading(false);
    }
  }, [fetchReady]);

  useEffect(() => {
    if (saveQuestionsFlag && numQuestions !== null) {
      if (questions.length > 0) {
        setItem("questions", questions);
        setQuestionsReady(true);
        setSaveQuestionsFlag(false);
      }
    }
  }, [saveQuestionsFlag, numQuestions, questions]);

  const resetQuiz = () => {
    setSelectedCategory(null);
    setNumQuestions(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setQuestions([]);
    setQuestionsReady(false);
    setSaveQuestionsFlag(false);
    setConfirmed(false);

    clearAll();
  };

  return {
    selectedCategory,
    loadingCategories,
    numQuestions,
    currentQuestionIndex,
    userAnswers,
    quizCompleted,
    questions,
    questionsReady,
    confirmed,
    loading,
    setSelectedCategory,
    setLoadingCategories,
    setNumQuestions,
    setCurrentQuestionIndex,
    setUserAnswers,
    setQuizCompleted,
    setQuestions,
    setQuestionsReady,
    setSaveQuestionsFlag,
    setConfirmed,
    setLoading,
    resetQuiz,
    handleAnswer: (answer) =>
      handleAnswer(
        answer,
        questions,
        currentQuestionIndex,
        setUserAnswers,
        setCurrentQuestionIndex,
        setQuizCompleted
      ),
    onQuestionsSliderSelect: (number) =>
      onQuestionsSliderSelect(number, setNumQuestions, setSaveQuestionsFlag),
    setSelectedCategoryAndReset: (category) =>
      setSelectedCategoryAndReset(
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
      ),
  };
};
