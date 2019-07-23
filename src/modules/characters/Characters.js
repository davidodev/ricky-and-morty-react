import React, { useEffect } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCharacters } from './Actions';
import Character from './Character';
import { Header, Wrapper, Loader } from '../../common/components';

export const Characters = () => {
  const dispatch = useDispatch();
  const characters = useSelector(store => store.characters.charactersList);
  const pageInfo = useSelector(store => store.characters.pageInfo);
  const fetchingError = useSelector(store => store.characters.fetchingCharactersListError);
  const fetchingPending = useSelector(store => store.characters.fetchingCharactersListPending);

  const hasMorePages = pageInfo ? Boolean(pageInfo.next) : false;
  const showInitialLoader = !fetchingError && !characters && fetchingPending;

  useEffect(() => {
    if (!characters) {
      dispatch(fetchCharacters());
    }
  }, []);

  if (fetchingError) {
    return <p>Data fetching error!</p>;
  }

  if (showInitialLoader) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Header text='Ricky and Morty characters' />
      <InfiniteScroll
        dataLength={characters ? characters.length : 0}
        next={() => {
          dispatch(fetchCharacters());
        }}
        hasMore={hasMorePages}
        loader={<Loader />}
      >
        <ListWrapper>
        {
          characters && characters.map(item => (
            <Character
              key={`${item.id}`}
              {...item}
            />
          ))
        }
        </ListWrapper>
      </InfiniteScroll>
    </Wrapper>
  )
};

const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
