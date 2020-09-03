import styled from "@emotion/styled";
import { Field, ErrorMessage, Form } from "formik";

export const FormControl = styled(Field)`
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 10px 18px;
  box-sizing: border-box;
  width: 100%;
  background-color: #eaeaea;
  transition: all 125ms ease-in-out;
  &:hover {
  }
  &:focus {
    box-shadow: 0 0 0 2pt rgba(49, 61, 90, 0.2);
    background-color: rgba(255, 255, 255, 0);
  }
`;

export const Input = styled.input`
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 10px 18px;
  box-sizing: border-box;
  width: 100%;
  background-color: #eaeaea;
  transition: all 125ms ease-in-out;
  &:hover {
  }
  &:focus {
    box-shadow: 0 0 0 2pt rgba(49, 61, 90, 0.2);
    background-color: rgba(255, 255, 255, 0);
  }
`;

export const FormError = styled(ErrorMessage)`
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const FormikForm = styled(Form)``;
