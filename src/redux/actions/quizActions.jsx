import { FETCH_QUESTIONS, SET_ANSWER, RESET_QUIZ, UPDATE_SCORE, SET_CATEGORY, SET_DIFFICULTY } from "../actionTypes"



// Define action creators
export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    payload: category,
  };
};



export const setDifficulty = (difficulty) => {
  return {
    type: SET_DIFFICULTY,
    payload: difficulty,
  };
};

export const updateScore = (score) => {
  return {
    type: UPDATE_SCORE,
    payload: score,
  };
};

export const fetchQuestions = (selectedCategory, selectedDifficulty) => {
  // console.log('category:', category);
  return async (dispatch) => {

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
      );
      const data = await response.json();
      const formattedQuestions = data.results.map((question, index) => ({
        id: index + 1,
        title: question.question,
        body: question.category,
        options: [
          ...question.incorrect_answers,
          question.correct_answer,
        ].sort(),
        correctAnswer: question.correct_answer,
      }));
      dispatch({
        type: FETCH_QUESTIONS,
        payload: formattedQuestions,
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

};

export const setAnswer = (questionId, answer) => {
  return {
    type: SET_ANSWER,
    payload: {
      questionId,
      answer,
    },
  };
};

export const resetQuiz = () => {
  return {
    type: RESET_QUIZ,
  };
};
