import { combineReducers } from 'redux';
import { reducers as characters } from './modules/characters';

export default combineReducers({
  characters,
})
