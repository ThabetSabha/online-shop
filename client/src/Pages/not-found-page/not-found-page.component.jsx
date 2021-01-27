import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../Components/custom-button/custom-button.component";
import "./not-found-page.styles.scss";

const NotFoundPage = () => {
  return (
    <div className="not-found-image-overlay">
      <div
        className="not-found-image"
        style={{ backgroundImage: "url(https://i.imgur.com/Q2BAOd2.png)" }}
      />
      <h2>This Page is Not on the Map</h2>
      <Link to="/">
        <CustomButton inverted>HomePage</CustomButton>
      </Link>
    </div>
  );
};

export default NotFoundPage;
