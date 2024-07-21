# Trivia app

## [Live preview](https://trivia-joy-ui.netlify.app/)

## Overview

Quizz App is a dynamic and interactive quiz application built using React and Material-UI (Joy UI). It leverages the Open Trivia Database API to fetch trivia questions from various categories, allowing users to test their knowledge across multiple topics. The application includes features such as selecting quiz categories, choosing the number of questions, and reviewing quiz results with detailed feedback on each question.

## Features

- **Category Selection**: Choose from a variety of trivia categories.
- **Question Selection**: Specify the number of questions for the quiz.
- **Detailed Results**: Review your answers with correct and incorrect indications after completing the quiz.
- **Session Persistence**: Utilize React Router and session storage to enable users to navigate back, change a question, refresh the page, go to the main page, and continue the quiz seamlessly.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Material-UI (Joy UI)**: Component library for styling and UI components.
- **Framer Motion**: Library for animations and transitions.
- **React Router**: Library for routing in React applications.

## Usage

- **Start the Quiz**: Navigate to the homepage and select a category.
- **Select Number of Questions**: Choose the desired number of questions for the quiz.
- **Answer Questions**: Answer each question at your own pace.
- **Review Results**: After completing the quiz, review your answers with detailed feedback on which were correct and incorrect.
- **Navigate and Resume**: Utilize navigation and session storage features to go back, change a question, refresh the page, or return to the main page and continue the quiz seamlessly.
- **Restart Quiz**: Option to restart the quiz and try again.

## File Tree

```plaintext
quizz-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── quiz/
│   │   │   ├── AnswerButtons.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── NumQuestionsChoice.jsx
│   │   │   ├── Quiz.jsx
│   │   │   ├── QuizQuestion.jsx
│   │   │   └── QuizResults.jsx
│   │   ├── Loading.jsx
│   │   ├── TopBar.jsx
│   ├── fetch/
│   │   ├── fetchCategories.js
│   │   ├── fetchQuestionCount.js
│   │   ├── fetchQuestions.js
│   │   └── useFetchQuestions.js
│   ├── style/
│   │   ├── index.css
│   │   ├── MotionButton.jsx
│   │   └── MotionWrapper.jsx
│   │   └── theme.js
│   ├── utils/
│   │   ├── additional.js
│   │   ├── handleAnswer.js
│   │   ├── onQuestionsSliderSelect.js
│   │   ├── quizContext.js
│   │   ├── sessionStorageUtils.js
│   │   ├── setSelectedCategoryAndReset.js
│   │   └── useAnimationValues.js
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
