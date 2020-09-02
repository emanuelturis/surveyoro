import styled from "@emotion/styled";
import { Field, Form } from "formik";
import { FormCheck } from "react-bootstrap";
import { ChangeEvent } from "react";

export const FormikForm = styled(Form)`
  .text-danger {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

export const FormControl = styled(Field)`
  outline: none;
  border: none;
  box-shadow: 0 0 0 2pt rgba(203, 197, 234, 0.5);
  border-radius: 5px;
  padding: 7.5px 12px;
  box-sizing: border-box;
  width: 100%;
  transition: all 125ms ease-in-out;
  &:hover {
  }
  &:focus {
    box-shadow: 0 0 0 2pt rgba(115, 98, 138, 1);
  }
`;

interface FormRadioProps {
  checked: boolean;
  onClick: Function;
  key: string;
  label: string;
}

export const FormRadio: React.FC<FormRadioProps> = ({
  checked,
  onClick,
  key,
  label,
}) => {
  const Container = styled.div`
    display: flex;
    align-items: center;
  `;

  const Label = styled.label`
    margin-top: 8px;
    margin-left: 5px;
  `;

  const RadioContainer = styled.div`
    border: 3px solid #183642;
    border-radius: 50%;
    padding: 2px;
  `;

  const Radio = styled.div`
    padding: 6px;
    border-radius: 50%;
    background-color: ${checked ? "#183642" : ""};
    &:hover {
      background-color: ${checked ? "#183642" : "#CBC5EA"};
    }
  `;

  return (
    <Container>
      <RadioContainer>
        <Radio onClick={() => onClick()} />
      </RadioContainer>
      <Label htmlFor={key}>{label}</Label>
    </Container>
  );
};

interface FormCheckboxProps {
  checked: boolean;
  onClick: Function;
  label: string;
  key: string;
}

type IconProps = {
  checked: boolean;
};

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  checked,
  onClick,
  label,
  key,
}) => {
  const HiddenCheckbox = styled.input`
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  `;

  const Checkbox = styled.div`
    margin-bottom: -3px;
    margin-right: 6px;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 3px;
    border: 3px solid #183642;
    transition: all 150ms;
  `;

  const CheckboxContainer = styled.div`
    vertical-align: middle;
  `;

  const Icon = styled.img`
    display: ${(props: IconProps) => (props.checked ? `block` : `none`)};
    margin-top: 2px;
    width: 100%;
  `;

  const Label = styled.label``;

  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} />
      <Checkbox onClick={() => onClick()}>
        <Icon src="/check.svg" alt="" checked={checked} />
      </Checkbox>
      <Label htmlFor={key}>{label}</Label>
    </CheckboxContainer>
  );
};

export const SubmitButton = styled.button`
  padding: 15px 25px;
  background-color: #183642;
  color: #eaeaea;
  opacity: 0.9;
  margin-top: 15px;
  border: 0;
  border-radius: 5px;
  transition: all 125ms ease-in-out;
  &:hover {
    opacity: 1;
  }
  &:focus {
    outline: none;
  }
`;
