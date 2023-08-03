import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  setAnswer,
  updateScore,
  setSelectedCategory,
  setSelectedDifficulty,

} from "../redux/actions/quizActions";
import he from 'he';
import '../App.css'
import { Button, Collapse, Divider, Result } from "antd";
import {  useNavigate } from "react-router-dom";

const QuizApp = () => {
  const navigate = useNavigate()
  const name = useSelector((state) => state.name); 
  const email = useSelector((state) => state.email); 
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const userAnswers = useSelector((state) => state.userAnswers);
  const score = useSelector((state) => state.score);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  // const categories = useSelector((state) => state.categories);
  const selectedCategories = useSelector((state) => state.categories);
  const difficulty = useSelector((state) => state.difficulty);
  

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
    dispatch(updateScore(0));
    dispatch(fetchQuestions(setSelectedCategory, setSelectedDifficulty));
  };

  const handleRetryNew = () => {
    navigate('/')
  };

  const categoryName = selectedCategories.find((category) => category.id === selectedCategory)?.name;

  return (
    <>
      <div className='heading'>
        <span>Welcome to &nbsp;<i style={{ color: 'white' }}>i</i>&nbsp; Quiz</span>
      </div>
      {!showScore ? (
        <section className="center-content">
          <div className="quiz-box">
            <div style={{ textAlign: "left" }}>
              <div className="head-q">
                Question {currentQuestionIndex + 1}
                <Divider className="divider-style" />
                <div style={{ textAlign: 'left', fontSize: '19px',display:'flex',justifyContent:'space-between' }}>
                  <span >Category : <span style={{color:"black"}}>{categoryName}</span></span>
                  <span>Difficulty Level : <span style={{color:"black"}}>{difficulty}</span></span>
                </div>
              </div>
              {questions && questions[currentQuestionIndex] && (
                <div>
                  <div className="q">{he.decode(questions[currentQuestionIndex].title)}</div>
                  {/* <h3>{he.decode(questions[currentQuestionIndex].body)}</h3> */}
                  <div style={{ marginTop: '30px' }}>
                    {questions[currentQuestionIndex].options.map((option) => (
                      <div className="option"
                        key={option}
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
                          {he.decode(option)}
                        </label>
                      </div>
                    ))}
                    <div className="warningmsg">
                      {warningMessage && (
                        <Result
                          status="warning"
                          title={warningMessage}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                  position: "relative",
                }}
              >
                <Button className='next-q'
                  onClick={handleNextQuestion}
                >
                  Next Question
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="center-container">
          <div className="quiz-result-box" >
            <div >
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: 28, textDecoration: 'underline', textAlign: 'center', color: 'rgba(234, 190, 90, 0.9)' }}>Quiz Completed!</h3>
              <p style={{ display: 'flex', width: '100%', justifyContent:'space-between',fontFamily: 'Poppins', fontWeight: 400, fontSize: 22,color:'lightslategray' }}>
                <span style={{ textAlign: 'left' }}>Name:&nbsp;&nbsp;<span style={{color:'black',fontSize:20}}>{name}</span> <br />Email:&nbsp;&nbsp;<span style={{color:'blue',fontSize:20}}>{email}</span></span>
                <span style={{ textAlign: 'right' }}>Your score: <span style={{color:'black'}}>{score} / {questions.length}</span></span>
              </p>
              <div>
                <h4 style={{ fontFamily: 'Poppins', color: 'green' }}>Questions Answered Correctly:</h4>
                {questions.map((question) => {
                  const userAnswer = userAnswers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer;
                  return (
                    isCorrect && (
                      <div key={question.id}>
                        <Collapse
                          className="collapse-true"
                          defaultActiveKey={[]}
                          expandIconPosition='end'
                        >
                          <Collapse.Panel header={he.decode(question.title)} key='1'>
                            <p>Selected Answer: {userAnswer}</p>
                          </Collapse.Panel>
                        </Collapse>
                      </div>
                    )
                  );
                })}
              </div>
              <div>
                <h4 style={{ fontFamily: 'Poppins', color: 'Red' }}>Questions Answered Incorrectly:</h4>
                {questions.map((question) => {
                  const userAnswer = userAnswers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer;
                  return (
                    !isCorrect && (
                      <div key={question.id}>
                        <Collapse
                          className="collapse-false"
                          defaultActiveKey={[]}
                          expandIconPosition='end'
                        >
                          <Collapse.Panel header={he.decode(question.title)} key='1'>
                            <p>Selected Answer: {userAnswer}</p>
                            <p>Correct Answer: {he.decode(question.correctAnswer)}</p>
                          </Collapse.Panel>
                        </Collapse>
                      </div>
                    )
                  );
                })}
              </div>
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                  marginTop: 25,
                }}
              >
                <Button className='next-q'
                  style={{marginRight:20}}
                  onClick={handleRetry}
                >
                  Retry Quiz
                </Button>
                <Button className='next-q'
                  style={{marginLeft:20}}
                  onClick={handleRetryNew}
                >
                  Retake New Quiz
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};


export default QuizApp;