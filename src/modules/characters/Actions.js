import axios from 'axios';
import {
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_ERROR,
  FETCH_EPISODES_BY_CHARACTER,
  FETCH_EPISODES_BY_CHARACTER_SUCCESS,
  FETCH_EPISODES_BY_CHARACTER_ERROR,
} from "./ActionTypes";

export const fetchCharacters = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_CHARACTERS,
  });

  const { pageInfo } = getState().characters;
  const uri = (pageInfo && pageInfo.next) || 'https://rickandmortyapi.com/api/character';

  try {
    const { data } = await axios.get(uri);

    dispatch({
      type: FETCH_CHARACTERS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FETCH_CHARACTERS_ERROR,
      payload: error,
    })
  }
};

export const fetchEpisodesByCharacter = (characterId) => async (dispatch, getState) => {
  dispatch({
    type: FETCH_EPISODES_BY_CHARACTER,
  });

  const { charactersList } = getState().characters;
  const { episode } = charactersList.find((character) => character.id === characterId);
  const episodeIdsAsString = episode
    .map(episode => episode.split('/').pop())
    .join(',');

  const uri = `https://rickandmortyapi.com/api/episode/${episodeIdsAsString}`;

  try {
    const { data } = await axios.get(uri);

    dispatch({
      type: FETCH_EPISODES_BY_CHARACTER_SUCCESS,
      payload: {
        episodes: Array.isArray(data) ? data : [data],
        characterId
      },
    })
  } catch (error) {
    dispatch({
      type: FETCH_EPISODES_BY_CHARACTER_ERROR,
      payload: error,
    })
  }
};


