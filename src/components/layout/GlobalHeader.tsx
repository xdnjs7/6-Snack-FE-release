"use client";

import React from "react";
import MobileHeader from "./MobileHeader";
import TabletHeader from "./TabletHeader";
import DesktopHeader from "./DesktopHeader";
import Mobile from "../common/Mobile";
import Tablet from "../common/Tablet";
import Desktop from "../common/Desktop";

export default function GlobalHeader() {
  return (
    <div>
      <Mobile>
        <MobileHeader />
      </Mobile>

      <Tablet>
        <TabletHeader />
      </Tablet>
      <Desktop>
        <DesktopHeader />
      </Desktop>
    </div>
  );

  return <MobileHeader />;
}
