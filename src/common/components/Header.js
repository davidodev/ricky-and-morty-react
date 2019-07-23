import React from 'react';
import styled from 'styled-components';

export const Header = ({ text }) => {
  return (
      <StyledHeader>{text}</StyledHeader>
  );
};

const StyledHeader = styled.h2`
  font-size: 20px;
  margin: 20px 5px;
`;
