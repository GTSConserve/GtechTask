import { combineReducers } from "redux";
import HomeReducer from "./HomeReducer";

const homeReducer = combineReducers({
  home: HomeReducer,
});

export default homeReducer;
