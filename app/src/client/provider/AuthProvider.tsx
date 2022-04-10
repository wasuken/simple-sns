import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { User, initUserState } from "../types/type";
import { useRouter } from "next/router";
import { noLoginPathList } from "../const/const";
import { useUser } from "../context/user";

axios.defaults.withCredentials = true;

export const useListenAuthState = () => {
  /* const [user, setUser] = useState<User>(initUserState); */
  const { setName, setLogin, setToken, setProfile, setUserid} = useUser();
  const router = useRouter();
  const setUser = (id, name, login, token, profile) => {
	setUserid(id);
	setName(name);
	setLogin(login);
	setToken(token);
	setProfile(profile);
  }

  const listenAuthState = (): void => {
    const options: AxiosRequestConfig = {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/user`,
      method: "GET",
      credentials: true,
    };

    axios(options)
      .then((res: AxiosResponse<User>) => {
        const user = res.data;
        console.log(user);
        setUser(user.id, user.name, true, user.token, user.profile);

		console.log(noLoginPathList.includes(router.pathname));
        if (noLoginPathList.includes(router.pathname)) {
          router.push("/");
        }
      })
      .catch((error: AxiosError) => {
		setUser(undefined, "", false, "", "");
        // TODO: セッションタイムアウト(401)時の処理
        if (noLoginPathList.includes(router.pathname)) {
          router.push(router.pathname);
        } else {
          router.push("/login");
        }
      });
  };
  return {
    listenAuthState,
  };
};

const AuthProvider = ({ children }) => {
  const { listenAuthState } = useListenAuthState();

  useEffect(() => {
    listenAuthState();
  }, []);
  return children;
};

export default AuthProvider;
