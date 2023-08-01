import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import quizReducer from "./reducers/quizReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    quizReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;

