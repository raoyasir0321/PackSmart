import React from "react";
import TopBar from "./TopBar/TopBar";
import CenterHeader from "./CenterHeader/CenterHeader";
import BottomHeader from "./BottomHeader.jsx/BottomHeader";

function Header() {
  return (
    <>
      {/* <TopBar /> */}
      <CenterHeader />
      <BottomHeader />
    </>
  );
}

export default Header;
