import React, { useContext } from "react";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "../contexts";
import { Avatar, Popover } from "antd";
import { message } from "antd";
import { logoutApi } from "../../libs/user/authApi";
import { getAuth, deleteAuth } from "../../libs/util";
export function UserAvatar() {
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { userProfile, setUserProfile } = useContext(USER_PROFILE_CONTEXT);

  async function logoutHandler() {
    const { refreshToken } = getAuth();
    if (refreshToken) {
      const logoutMessage = await logoutApi(refreshToken, (error) => {
        if (error) {
          messageApi.error("An error occurred while logging out");
        }
      });
    }
    deleteAuth();
    setUserProfile(null);

    messageApi.success("Logged out successfully");
  }

  const options = (
    <div>
      <ul className="space-y-2 mx-2 px-2 min-w-[10ch]">
        <li
          className="hover:font-semibold hover:text-green transition-colors cursor-pointer"
          onClick={logoutHandler}
        >
          Sign out
        </li>
        <li className="hover:font-semibold hover:text-green transition-colors cursor-pointer">
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
          </div>
        </Popover>
      </span>
    )
  );
}
