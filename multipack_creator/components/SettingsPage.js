import { Button, Card, Tabs } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import FormsAddTags from "./FormsAddTags";
import ShippinfCarrier from "./ShippingCarrier";
import AdvanceCheckbox from "./AdvanceCheckbox";
import store from "store-js";
import PartialFormTags from "./PartialFormTags";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
import LoadingSpinner from "./LoadingSpinner";

import TopHeader from "./TopHeader";
import FinalEdit from "./FinalEdit";
import HistoryComponents from "./HistoryComponents";

function SettingsPage({
  setActiveHelp,
  setActiveHome,
  activehelp,
  activehome,
  setSettings,
  setting,
  userHistory,
}) {

 
  
  return (
    <div>
      <TopHeader
        setActiveHelp={setActiveHelp}
        setSettings={setSettings}
        setActiveHome={setActiveHome}
        activehome={activehome}
        activehelp={activehelp}
        setting={setting}
      ></TopHeader>
      <div>
        <HistoryComponents></HistoryComponents>
      </div>
    </div>
  );
}

export default SettingsPage;
