import React, { useState, useContext } from "react";
import { Button, Modal } from "antd";
import { MessageCircleWarning } from "lucide-react";
import { logoutApi } from "../../libs/user/authApi";
import { getAuth, deleteAuth } from "../../libs/util";
import { MESSAGE_API_CONTEXT } from "@/contexts";
const Logout = ({ isModalOpen }) => {
  const messageApi = useContext(MESSAGE_API_CONTEXT);
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
  return (
    <Modal
      title="Logout"
      open={isModalOpen}
      onOk={logoutHandler}
      onCancel={() => {
        console.log("Logout Cancel");
      }}
      okText="Logout"
      cancelText="Cancel"
    >
      <span className="font-semibold">
        <MessageCircleWarning size={48} />
        Are you sure you want to logout{" "}
      </span>
    </Modal>
  );
};

export default Logout;
