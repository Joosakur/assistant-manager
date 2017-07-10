import React from "react";
import {IndexLink, Link} from "react-router";

const Header = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" , "}
      <Link to="/assistants" activeClassName="active">Assistants</Link>
    </nav>
  );
};

export default Header;
