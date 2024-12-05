import React, { useState, useContext } from "react";
import { Button, Modal } from "antd";
import { MessageCircleWarning } from "lucide-react";
import { logoutApi } from "../../libs/user/authApi";
import { getAuth, deleteAuth } from "../../libs/util";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { USER_PROFILE_CONTEXT } from "@/contexts";
const Logout = ({ logoutOpen, setLogoutOpen }) => {
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);
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
    setLogoutOpen(false);
    messageApi.success("Logged out successfully");
  }
  return (
    <Modal
      title="Confirm Logout"
      open={logoutOpen}
      onOk={logoutHandler}
      onCancel={() => {
        setLogoutOpen(false);
      }}
      okText="Logout"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
      cancelButtonProps={{ className: "cancel-button" }}
    >
      <span className="flex font-semibold">
        <MessageCircleWarning size={20} className="mr-2 text-red-700" />
        Are you sure you want to logout{" "}
      </span>
    </Modal>
  );
};

export default Logout;
