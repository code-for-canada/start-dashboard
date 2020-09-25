import React from "react";
import { NavBar, Footer} from "../components";

const DefaultLayout = ({ children }) => {

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
        <div className="px-4 bg-light">
          {children}
        </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;