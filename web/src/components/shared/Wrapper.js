import styled from "styled-components";
import { fadeIn } from "./animation";

const Wrapper = styled.section`
  min-width: 800px;
  animation: 0.5s ${fadeIn} ease-in;
`;

export default Wrapper;
