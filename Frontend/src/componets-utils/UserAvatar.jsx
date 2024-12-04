import React, { useContext } from "react";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "../contexts";
import { Avatar, Popover } from "antd";

import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
export function UserAvatar({ showName }) {
  const { userProfile, setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = React.useState(false);
  const options = (
    <div>
      <ul className="space-y-2 mx-2 px-2 min-w-[10ch]">
        <li
          className="hover:font-semibold hover:text-green transition-colors cursor-pointer select-none"
          onClick={() => {
            setLogoutModal(true);
          }}
        >
          Sign out
        </li>
        <li
          className="hover:font-semibold hover:text-green transition-colors cursor-pointer select-none"
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </li>
      </ul>
    </div>
  );
  return (
    userProfile && (
      <span>
        <Popover
          placement="bottom"
          content={options}
          style={{ backgroundColor: "#EBEBEB" }}
          mouseEnterDelay={0.3}
          mouseLeaveDelay={0.5}
        >
          <div className="cursor-pointer">
            <Avatar
              style={{ backgroundColor: "#21CA1B", verticalAlign: "middle" }}
              size="medium"
            >
              <span className="font-semibold">{userProfile.firstName[0]}</span>
            </Avatar>

            {showName && (
              <span className="ml-2 font-semibold algin-middle">
                {userProfile.firstName}
              </span>
            )}
          </div>
        </Popover>
      </span>
    )
  );
}
