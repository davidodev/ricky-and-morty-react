import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { fetchEpisodesByCharacter } from './Actions';
import { Header, Wrapper, Loader } from '../../common/components';
import { Episode } from './Episode';

export const CharacterDetails = ({ match }) => {
  const dispatch = useDispatch();
  const characterId = parseInt(match.params.id);
  const details = useSelector(store => store.characters.characterDetails[characterId]);
  const fetchingError = useSelector(store => store.characters.fetchingEpisodesByCharacterError);
  const fetchingPending = useSelector(store => store.characters.fetchingEpisodesByCharacterPending);

  useEffect(() => {
    dispatch(fetchEpisodesByCharacter(characterId));
  }, []);

  if (fetchingError) {
    return <p>Data fetching error!</p>;
  }

  if (fetchingPending) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Header text='Episodes' />
      {
        details && details.episodes && details.episodes.map(episode => (
          <Episode key={`${episode.id}`} {...episode} />
        ))
      }
    </Wrapper>
  );
};
