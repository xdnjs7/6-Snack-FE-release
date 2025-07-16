import React from "react";
import Mobile from "./Mobile";
import Tablet from "./Tablet";
import Desktop from "./Desktop";
import MobileProductDetail from "./MobileProductDetail";
import TabletProductDetail from "./TabletProductDetail";
import DesktopProductDetail from "./DesktopProductDetail";

export default function ProductDetail() {
  return (
    <div>
      <Mobile>
        <MobileProductDetail />
      </Mobile>
      <Tablet>
        <TabletProductDetail />
      </Tablet>
      <Desktop>
        <DesktopProductDetail />
      </Desktop>
    </div>
  );
}
