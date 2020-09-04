import styled from "@emotion/styled";

export const Icon = styled.div`
  padding: 12px;
  background-color: #eaeaea;
  border-radius: 5px;
  opacity: 0.8;
  transition: all 125ms ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  svg {
    color: #313d5a;
    display: block;
    margin: auto;
    font-size: 15px;
  }
`;
