import { FETCH_QUESTIONS, SET_ANSWER, RESET_QUIZ, UPDATE_SCORE,SET_CATEGORY, SET_DIFFICULTY, FETCH_CATEGORY,NAME,EMAIL } from "../actionTypes";

const initialState = {
  categories: [],
  questions: [],
  userAnswers: {},
  score: 0,
  selectedCategory: null,
  selectedDifficulty: null,
  name:'',
  email:''
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAME:
      return {
        ...state,
        name: action.payload,
      }
      case EMAIL:
        return {
          ...state,
          email: action.payload,
        }
    case FETCH_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case FETCH_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      }

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
      return {
        ...state,
        selectedCategory: action.payload,
        category: action.payload,
      };
    case SET_DIFFICULTY:
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



