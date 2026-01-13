import { Link } from "react-router-dom";

const CustomLink = ({ link, text }) => {
  return (
    <Link
      to={`/${link}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {text}
    </Link>
  );
};

export default CustomLink;
