import { FETCH_QUESTIONS, SET_ANSWER, RESET_QUIZ, UPDATE_SCORE,SET_CATEGORY, SET_DIFFICULTY } from "../actionTypes";

const initialState = {
  questions: [],
  userAnswers: {},
  score: 0,
  selectedCategory: null,
  selectedDifficulty: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      console.log(action.payload);
      console.log("test")
      return {
        ...state,
        questions: action.payload,
      };

    case SET_ANSWER:
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    case UPDATE_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    case RESET_QUIZ:
      return {
        ...initialState,
      };
    case SET_CATEGORY:
      console.log(action.payload);
      return {
        ...state,
        selectedCategory: action.payload,
        category: action.payload,
      };
    case SET_DIFFICULTY:
      console.log(action.payload);
      return {
        ...state,
        selectedDifficulty: action.payload,
        difficulty: action.payload,
      };
    default:
      return state;
  }
};

export default quizReducer;



