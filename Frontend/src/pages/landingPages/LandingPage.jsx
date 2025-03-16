import React, { useContext } from "react";
import { getAuth } from "@/lib/util";
import CustomerPage from "./CustomerPage";
import VisitorsPage from "./VisitorsPage";
import MerchantEmailVerification from "../MerchantEmailVerification";
import { USER_PROFILE_CONTEXT } from "@/contexts";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { userId, userType } = getAuth();
  const loggedIn = userId ? true : false;
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);

  const navigate = useNavigate();
  // Check if user is a merchant and email is not verified (emailVerifiedAt is null)
  const isMerchantUnverified =
    loggedIn &&
    userType === "merchant" &&
    userProfile &&
    userProfile.emailVerifiedAt === null;

  // Render verification page if merchant email is unverified
  if (isMerchantUnverified) {
    return <MerchantEmailVerification />;
  }

  const isAdmin = userProfile && userProfile.role === "ADMIN";
  if (isAdmin) {
    navigate("/admin");
    return;
  }

  // Otherwise render normal content based on login status
  return <>{loggedIn ? <CustomerPage /> : <VisitorsPage />}</>;
}
