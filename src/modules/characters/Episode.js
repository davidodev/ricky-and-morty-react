import React from 'react';
import styled from 'styled-components';

export const Episode = ({ air_date, name, episode }) => {
  return (
    <Wrapper>
      <Title>{episode}: {name}</Title>
      <Date>Date: {air_date}</Date>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: cornsilk;
  padding: 10px;
  font-size: 20px;
  margin: 10px 5px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 0 0 10px;
`;

const Date = styled.p`
  font-size: 14px;
  margin: 0;
`;
