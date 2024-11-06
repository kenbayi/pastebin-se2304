import React from "react";
import { IoIosArrowBack } from "react-icons/io";

interface BackProps {
  call: (any: any) => any;
}

const Back = (props: BackProps) => {
  return (
    <div onClick={props.call} className="back title-small" style={{margin: "2rem 0 0 5rem"}}>
      <span className="icon">
        <IoIosArrowBack />
      </span>
      BACK
    </div>
  );
};

export default Back;