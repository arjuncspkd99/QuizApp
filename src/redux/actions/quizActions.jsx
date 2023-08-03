import { FETCH_QUESTIONS, SET_ANSWER, RESET_QUIZ, UPDATE_SCORE, SET_CATEGORY, SET_DIFFICULTY , FETCH_CATEGORY, NAME,EMAIL} from "../actionTypes"


export const setSelectedCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});

export const setSelectedDifficulty = (difficulty) => ({
  type: SET_DIFFICULTY,
  payload: difficulty,
});


export const setName = (name) => {
  return (dispatch) => {
    dispatch({
      type: NAME,
      payload: name,
    });
  };
};

export const setEmail = (email) => {
  return (dispatch) => {
    dispatch({
      type: EMAIL,
      payload: email,
    });
  };
};

export const updateScore = (score) => {
  return {
    type: UPDATE_SCORE,
    payload: score,
  };
};

export const fetchCategory = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://opentdb.com/api_category.php"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch categories.");
      }

      const data = await response.json();
      const categories = data.trivia_categories;

      dispatch({
        type: FETCH_CATEGORY,
        payload: categories,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
};
 
export const fetchQuestions = () => {
  return async (dispatch, getState) => {
    const selectedCategory = getState().selectedCategory;
    const selectedDifficulty = getState().selectedDifficulty;
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
