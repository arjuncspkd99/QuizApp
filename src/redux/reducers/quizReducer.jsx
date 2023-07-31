import { FETCH_QUESTIONS, SET_ANSWER, RESET_QUIZ, UPDATE_SCORE } from "../actionTypes";

const initialState = {
  questions: [],
  userAnswers: {},
  score: 0,
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
    default:
      return state;
  }
};

export default quizReducer;



