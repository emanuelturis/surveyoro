import React from "react";
import OnClickOutside from "./OnClickOutside";

interface Props {
  show: boolean;
  setShow: Function;
}

const Dropdown: React.FC<Props> = ({ children, show, setShow }) => {
  if (!show) {
    return null;
  }
  return <div onClick={() => setShow(false)}>{children}</div>;
};

export default Dropdown;
