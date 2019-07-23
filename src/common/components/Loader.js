import React from 'react';
import styled from 'styled-components';

export const Loader = () => {
  return (
    <StyledLoader>Loading...</StyledLoader>
  );
};

const StyledLoader = styled.p`
  font-size: 18px;
  text-align: center;
`;
