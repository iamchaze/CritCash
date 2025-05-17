import React from "react";
import { Link } from "react-router-dom";

const NavButton = (props) => {
  let title = undefined;
  if (props.title) {
    title = props.title;
  }
  return (
    <>
      <button>
        <Link
          state={{ title }}
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
