import { useContext } from "react";
import { MESSAGE_API_CONTEXT } from "./contexts";

export function useErrorLogger() {
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  return (error) => {
    messageApi.error(error);
    console.error(error);
  };
}
