import { combineReducers, configureStore } from '@reduxjs/toolkit'

// call Reducers
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';


const rootReducer = combineReducers({
  // Reducers
  questions : questionReducer,
  result : resultReducer
})

// Create store with reducer
export default configureStore({ reducer : rootReducer })