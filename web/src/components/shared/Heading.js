import React from "react";
import styled, { css } from "styled-components";

export const StyledHeading = styled.h2`
  font-size: 2.5em;
  ${({ primary }) =>
    primary &&
    css`
      background: #0052cc; // TODO: import from theme file
      font-size: 2em;
      font-weight: bolder;
    `}
`;

export const OrangeHeading = styled(StyledHeading)`
  color: orange;
`;
