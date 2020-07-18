import styled, { css } from "styled-components";
import { fadeIn } from "./animation";

export const StyledHeading = styled.h2`
  font-size: 2.5em;
  animation: 2s ${fadeIn} ease-in;
  ${({ primary }) =>
    primary &&
    css`
      background: #0052cc; // TODO: import from theme file
      font-size: 2em;
      font-weight: bolder;

      &:hover {
        background: red;
      }
    `};
`;

// you can extend styled-components
export const OrangeHeading = styled(StyledHeading)`
  color: orange;
`;
