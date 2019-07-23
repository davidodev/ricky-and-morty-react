import React from 'react';
import styled from 'styled-components';

export const Wrapper = ({ children }) => {
  return (
    <StyledWrapper>
      {children}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 5px;
  
  @media (min-width: 1024px) {
    width: 820px;
  }
`;
