import { createContext, useContext, useState } from "react";
import { initUserInfoState, UserInfo } from "../types/type";

const UserContext = createContext<UserInfo>(initUserInfoState);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<boolean>(false);
  const [profile, setProfile] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [userid, setUserid] = useState<number | undefined>(undefined);

  const value = {
    name,
    setName,
    login,
    setLogin,
    token,
    setToken,
    profile,
    setProfile,
    userid,
    setUserid,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
