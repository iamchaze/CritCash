import React from "react";
import { Link } from "react-router-dom";

const NavButton = (props) => {
  return (
    <>
      <button>
        <Link
          to={props.link}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {props.text}
        </Link>
      </button>
    </>
  );
};

export default NavButton;
