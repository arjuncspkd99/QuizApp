import { FETCH_QUESTIONS, SET_ANSWER, RESET_QUIZ, UPDATE_SCORE, SET_CATEGORY, SET_DIFFICULTY } from "../actionTypes"


// Define action creators
export const setSelectedCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});

export const setSelectedDifficulty = (difficulty) => ({
  type: SET_DIFFICULTY,
  payload: difficulty,
});

export const updateScore = (score) => {
  return {
    type: UPDATE_SCORE,
    payload: score,
  };
};
// const findCategoryIdByName = (categories, categoryName) => {
//   const foundCategory = categories.find(
//     (category) => category.name === categoryName
//   );
//   return foundCategory ? foundCategory.id : null;
// };

export const fetchQuestions = () => {
  return async (dispatch, getState) => {
    const selectedCategory = getState().selectedCategory;
    const selectedDifficulty = getState().selectedDifficulty;
    // const state = getState();
    // const selectedCategoryName = state.selectedCategory;
    // const selectedDifficulty = state.selectedDifficulty;
    // const categories = state.categories; // Assuming you have categories in your state

    // const selectedCategoryId = findCategoryIdByName(
    //   categories,
    //   selectedCategoryName
    // );

    // if (!selectedCategoryId) {
    //   console.error("Selected category not found.");
    //   return;
    // }
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
