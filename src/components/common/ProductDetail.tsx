import React from "react";
import Mobile from "./Mobile";
import Tablet from "./Tablet";
import Desktop from "./Desktop";
import MobileProductDetail from "./MobileProductDetail";
import DesktopProductDetail from "./DesktopProductDetail";

export default function ProductDetail() {
  return (
    <div>
      <Mobile>
        <MobileProductDetail />
      </Mobile>
      <Tablet>
        <MobileProductDetail />
      </Tablet>
      <Desktop>
        <DesktopProductDetail />
      </Desktop>
    </div>
  );
}
