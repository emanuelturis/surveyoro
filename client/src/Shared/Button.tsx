import styled from "@emotion/styled";

type ButtonProps = {
  size?: "small" | "medium" | "large";
  variant?: "cancel" | "primary" | "danger";
};

export const Button = styled.button`
  padding: 15px 25px;
  padding: ${({ size = "medium" }: ButtonProps) =>
    (size === "small" && "5px 12px") ||
    (size === "medium" && "7.5px 18px") ||
    (size === "large" && "15px 25px")};
  font-size: ${({ size = "medium" }: ButtonProps) =>
    (size === "small" && "0.889em") ||
    (size === "medium" && "1em") ||
    (size === "large" && "1.125em")};
  background-color: ${({ variant = "primary" }: ButtonProps) =>
    (variant === "primary" && "#313d5a") ||
    (variant === "cancel" && "#EAEAEA") ||
    (variant === "danger" && "#FF3232")};
  color: ${({ variant = "primary" }: ButtonProps) =>
    (variant === "primary" && "#eaeaea") ||
    (variant === "cancel" && "#313D5A") ||
    (variant === "danger" && "#ffffff")};
  opacity: 0.9;
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
  &:disabled {
    opacity: 0.5;
  }
`;
