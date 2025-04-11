import React from "react";
import { useNavigate } from "react-router-dom";
import notfound from "../../../src/assets/images/not_found.png";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className="subscribe-sec notfound mt-0 d-flex flex-column align-items-center">
        <img src={notfound} style={{ width: "250px" }} />
        <p style={{ fontSize: "22px", fontWeight: "500", textAlign: "center" }}>
          Sorry, the page you visited does not exist.
        </p>
        <button
          type="submit"
          className="btn     mb-0"
          onClick={() => navigate("/")}
        >
          Back Home <i className="fa fa-arrow-right ms-2" />
        </button>
      </div>
    </>
  );
}

export default PageNotFound;
