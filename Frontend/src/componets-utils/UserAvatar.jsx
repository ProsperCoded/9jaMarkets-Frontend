import React, { useContext } from "react";
import {
  LOGOUT_MODAL_CONTEXT,
  USER_PROFILE_CONTEXT,
  LOGIN_MODAL_CONTEXT,
  SIGNUP_MODAL_CONTEXT,
} from "../contexts";
import { Avatar, Popover } from "antd";

import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
export function UserAvatar({ showName, auth }) {
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const { setSignupOpen } = useContext(SIGNUP_MODAL_CONTEXT);
  const { setLoginOpen } = useContext(LOGIN_MODAL_CONTEXT);
  const { setLogoutOpen } = useContext(LOGOUT_MODAL_CONTEXT);
  const navigate = useNavigate();
  const name = userProfile && (userProfile.firstName || userProfile.brandName);
  const options = (
    <div>
      <ul className="space-y-2 mx-2 px-2 min-w-[10ch]">
        <li
          className="hover:font-semibold hover:text-Primary transition-colors cursor-pointer select-none"
          onClick={() => {
            setLogoutOpen(true);
          }}
        >
          Sign out
        </li>
        <li
          className="hover:font-semibold hover:text-Primary transition-colors cursor-pointer select-none"
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </li>
      </ul>
    </div>
  );
  return userProfile ? (
    <span>
      <Popover
        placement="bottom"
        content={options}
        style={{ backgroundColor: "#EBEBEB" }}
        mouseEnterDelay={0.3}
        mouseLeaveDelay={0.5}
      >
        <div className="cursor-pointer">
          {showName ? (
            <div className="flex items-center bg-white px-2 py-1.5 rounded-full">
              <Avatar
                style={{ backgroundColor: "#21CA1B", verticalAlign: "middle" }}
                size="medium"
              >
                <span className="font-semibold">{name[0]}</span>
              </Avatar>
              <span className="ml-2 font-semibold text-Primary algin-middle">
                {name}
              </span>
            </div>
          ) : (
            <Avatar
              style={{ backgroundColor: "#21CA1B", verticalAlign: "middle" }}
              size="medium"
            >
              <span className="font-semibold">{name[0]}</span>
            </Avatar>
          )}
        </div>
      </Popover>
    </span>
  ) : (
    auth && (
      <div className="flex md:flex-row flex-col gap-3 ml-auto">
        <button
          onClick={(e) => {
            setLoginOpen(true);
            e.stopPropagation();
          }}
          className="border-white hover:bg-white px-4 py-1 border rounded-full text-white hover:text-Primary transition"
        >
          Login
        </button>
        <button
          onClick={(e) => {
            setSignupOpen(true);
            e.stopPropagation();
          }}
          className="bg-Primary hover:bg-P2 px-4 py-1 rounded-full text-white transition"
        >
          Sign Up
        </button>
      </div>
    )
  );
}
