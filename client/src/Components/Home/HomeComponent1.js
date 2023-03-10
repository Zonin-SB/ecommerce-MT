import React from "react";
import banner from "../../images/ecomBanner.png";

function HomeComponent1() {
  return (
    <div className="mt-4">
      <img
        src={banner}
        alt="banner"
        className="img-fluid mx-auto d-block"
        style={{ width: "80%" }}
      />
    </div>
  );
}

export default HomeComponent1;
