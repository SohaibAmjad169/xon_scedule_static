import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; 
import bookingReducer from './reducers/bookingReducer';

const rootReducer = combineReducers({
    booking: bookingReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk)); 

export default store;
