import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Character = ({ image, name, id }) => {
  return (
    <Wrapper src={image}>
      <Text>{name}</Text>
      <StyledLink to={`/character/${id}`} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: url(${props => props.src});
  background-size: cover;
  font-size: 18px;
  position: relative;
  width:160px;
  height: 160px;
  margin: 5px;
  flex-grow: 1;
  
  @media (min-width: 480px) {
    width: 220px;
    height: 220px;
  }
`;

const Text = styled.h2`
  position: absolute;
  background: beige;
  bottom: 0;
  width: 100%;
  margin: 0;
  opacity: 0.8;
  font-size: 18px;
  padding: 5px;
  box-sizing: border-box;
  height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const StyledLink = styled(Link)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export default Character;
