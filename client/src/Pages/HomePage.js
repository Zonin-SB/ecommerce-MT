import React from "react";

import {
  HomeComponent1,
  HomeComponent2,
  HomeComponent3,
  Navbar,
} from "../Components";

function HomePage() {
  return (
    <div>
      <Navbar />
      <HomeComponent1 />
      <HomeComponent2 />
      <HomeComponent3 />
    </div>
  );
}

export default HomePage;
