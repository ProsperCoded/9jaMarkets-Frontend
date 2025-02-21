import React from "react";
import { getAuth } from "@/lib/util";
import CustomerPage from "./CustomerPage";
import VisitorsPage from "./VisitorsPage";
export default function LandingPage() {
  const userId = getAuth().userId;
  const loggedIn = userId ? true : false;
  return <>{loggedIn ? <CustomerPage /> : <VisitorsPage />}</>;
}
