import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/user";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { noLoginPathList } from "../const/const";
import AuthProvider from "../provider/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
	<UserProvider>
	  <AuthProvider>
		<Component {...pageProps} />
      </AuthProvider>
    </UserProvider>

  );
}

export default MyApp;
