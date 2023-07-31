/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  setAnswer,
  updateScore,
  resetQuiz,
} from "../redux/actions/quizActions";
import he from 'he';

const QuizApp = ({ category }) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const userAnswers = useSelector((state) => state.userAnswers);
  const score = useSelector((state) => state.score);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showScore, setShowScore] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setWarningMessage("");
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === "") {
      setWarningMessage("Please select an option.");
      return;
    }

    if (currentQuestion && currentQuestion.id) {
      const isCorrectAnswer = currentQuestion.correctAnswer === selectedOption;

      if (isCorrectAnswer) {
        dispatch(updateScore(score + 1));
      }

      dispatch(setAnswer(currentQuestion.id, selectedOption));

      if (currentQuestionIndex + 1 === questions.length) {
        setShowScore(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
    setSelectedOption('');
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setShowScore(false);
  };

  return (
    <div style={{ marginTop: 150 }}>
      {!showScore ? (
        <div className="questionpg" style={{ textAlign: "left", border: "2px solid brown", padding: 20, color: "brown", backgroundColor: "lightcyan", borderRadius: "10px" }}>
          <h1 style={{ textAlign: "center" }}>
            Question {currentQuestionIndex + 1}
          </h1>
          {questions && questions[currentQuestionIndex] && (
            <div>
              <h2>{he.decode(questions[currentQuestionIndex].title)}</h2>
              <h3>{he.decode(questions[currentQuestionIndex].body)}</h3>
              <div>
                {questions[currentQuestionIndex].options.map((option) => (
                  <div
                    key={he.decode(option)}
                    style={{
                      marginBottom: 20,
                      fontSize: 17,
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <label>
                      <input
                        style={{ marginRight: 20 }}
                        type="radio"
                        name="option"
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                      />
                      {option}
                    </label>
                  </div>
                ))}
                {warningMessage && (
                  <p
                    style={{
                      color: "red",
                      fontSize: 18,
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    {warningMessage}
                  </p>
                )}
              </div>
            </div>
          )}
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              marginTop: 75,
            }}
          >
            <button
              style={{
                height: 36,
                width: 172,
                fontSize: 17,
                fontWeight: 700,
              }}
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          </div>
        </div>
      ) : (
        <div className="lastpage">
          <h3>Quiz Completed!</h3>
          <p>
            Your score: {score} / {questions.length}
          </p>
          <div>
            <h4>Questions Answered Correctly:</h4>
            {questions.map((question) => {
              const userAnswer = userAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              return (
                isCorrect && (
                  <div key={question.id}>
                    <p>{question.title}</p>
                  </div>
                )
              );
            })}
          </div>
          <div>
            <h4>Questions Answered Incorrectly:</h4>
            {questions.map((question) => {
              const userAnswer = userAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              return (
                !isCorrect && (
                  <div key={question.id}>
                    <p>{question.title}</p>
                    <p>Correct Answer: {question.correctAnswer}</p>
                  </div>
                )
              );
            })}
          </div>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              marginTop: 75,
            }}
          >
            <button
              style={{
                height: 36,
                width: 172,
                fontSize: 17,
                fontWeight: 700,
                marginBottom: "25px"
              }}
              onClick={handleRetry}
            >
              Retry Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default QuizApp;