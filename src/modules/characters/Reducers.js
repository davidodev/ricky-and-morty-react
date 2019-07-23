import { combineReducers } from "redux";
import {
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_ERROR,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_EPISODES_BY_CHARACTER,
  FETCH_EPISODES_BY_CHARACTER_ERROR,
  FETCH_EPISODES_BY_CHARACTER_SUCCESS,
} from './ActionTypes';
import { createRequestReducers } from '../../common'

const charactersList = (state = null, action) => {
  switch (action.type) {
    case FETCH_CHARACTERS_SUCCESS:
      return state ? [
        ...state,
        ...action.payload.results
      ] : action.payload.results;
    default:
      return state;
  }
};

const pageInfo = (state = null, action) => {
  switch (action.type) {
    case FETCH_CHARACTERS_SUCCESS:
      return action.payload.info;
    default:
      return state;
  }
};

const characterDetails = (state = {}, action) => {
  switch (action.type) {
    case FETCH_EPISODES_BY_CHARACTER_SUCCESS:
      return {
        ...state,
        [action.payload.characterId]: action.payload,
      };
    default:
      return state;
  }
};

const [
  fetchingEpisodesByCharacterPending,
  fetchingEpisodesByCharacterError,
] = createRequestReducers({
  start: FETCH_EPISODES_BY_CHARACTER,
  error: FETCH_EPISODES_BY_CHARACTER_ERROR,
  success: FETCH_EPISODES_BY_CHARACTER_SUCCESS,
});

const [
  fetchingCharactersListPending,
  fetchingCharactersListError,
] = createRequestReducers({
  start: FETCH_CHARACTERS,
  error: FETCH_CHARACTERS_ERROR,
  success: FETCH_CHARACTERS_SUCCESS,
});

export const reducers = combineReducers({
  charactersList,
  fetchingCharactersListPending,
  fetchingCharactersListError,
  pageInfo,
  characterDetails,
  fetchingEpisodesByCharacterPending,
  fetchingEpisodesByCharacterError,
});

