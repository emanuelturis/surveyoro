import React, { useEffect, useRef } from "react";

interface Props {
  handler: Function;
  active: boolean;
}

const OnClickOutside: React.FC<Props> = ({ children, handler, active }) => {
  const ref = useRef<any>();
  useEffect(() => {
    const listener = (event: any) => {
      if (active && ref.current && !ref.current.contains(event.target)) {
        handler();
      }
      return;
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, active]);

  return <div ref={ref}>{children}</div>;
};

export default OnClickOutside;
