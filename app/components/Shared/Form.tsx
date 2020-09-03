import styled from "@emotion/styled";
import { Field, Form, ErrorMessage } from "formik";

export const FormikForm = styled(Form)``;

export const FormError = styled(ErrorMessage)`
  margin-top: 8px;
  margin-bottom: 8px;
`;

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

interface FormRadioProps {
  checked: boolean;
  onClick: Function;
  key: string;
  label: string;
  name: string;
}

type RadioProps = {
  checked: boolean;
};

const RadioLabel = styled.label`
  margin-top: 1px;
  margin-left: 8px;
`;

const RadioContainer = styled.div`
  margin-top: 5px;
  vertical-align: middle;
`;

const HiddenRadio = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const RadioWrapper = styled.div`
  border: 3px solid #183642;
  padding: 2px;
  border-radius: 50%;
  float: left;
  ${HiddenRadio}:focus + & {
    box-shadow: 0 0 0 3px #cbc5ea;
  }
`;

const Radio = styled.div`
  padding: 6px;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: ${(props: RadioProps) =>
    props.checked ? "#183642" : "#ffffff"};
  &:hover {
    background-color: ${(props: RadioProps) =>
      props.checked ? "#183642" : "#CBC5EA"};
  }
`;

export const FormRadio: React.FC<FormRadioProps> = ({
  checked,
  onClick,
  key,
  label,
  name,
}) => {
  return (
    <RadioContainer>
      <HiddenRadio
        name={name}
        type="radio"
        checked={checked}
        onChange={() => onClick()}
      />
      <RadioWrapper>
        <Radio checked={checked} onClick={() => onClick()} />
      </RadioWrapper>
      <RadioLabel htmlFor={key}>{label}</RadioLabel>
    </RadioContainer>
  );
};

interface FormCheckboxProps {
  checked: boolean;
  onClick: Function;
  label: string;
  key: string;
  name: string;
}

type IconProps = {
  checked: boolean;
};

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Checkbox = styled.div`
  margin-bottom: -4px;
  margin-right: 6px;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 3px solid #183642;
  transition: all 150ms;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #cbc5ea;
  }
`;

const CheckboxContainer = styled.div`
  vertical-align: middle;
`;

const Icon = styled.img`
  display: ${(props: IconProps) => (props.checked ? `block` : `none`)};
  margin-top: 2px;
  width: 100%;
`;

const CheckboxLabel = styled.label``;

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  checked,
  onClick,
  label,
  key,
  name,
}) => {
  return (
    <CheckboxContainer>
      <HiddenCheckbox
        type="check"
        onChange={() => onClick()}
        checked={checked}
        name={name}
      />
      <Checkbox checked={checked} onClick={() => onClick()}>
        <Icon src="/check.svg" alt="" checked={checked} />
      </Checkbox>
      <CheckboxLabel htmlFor={key}>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};

export const SubmitButton = styled.button`
  padding: 15px 25px;
  background-color: #313d5a;
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
    box-shadow: 0 0 0 2pt rgba(49, 61, 90, 0.2);
    opacity: 0.95;
  }
`;
