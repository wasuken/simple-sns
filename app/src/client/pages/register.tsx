import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router, { useRouter } from 'next/router';

import Header from "../componet/Header";
import RegisterPage from "../container/RegisterPage";
import { useUser } from "../context/user";

const Home: NextPage = () => {
  const router = useRouter();
  const isReady = router.isReady;
  const {login} = useUser()

  if (!isReady) {
    return (<p>Loading...</p>);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Simple SNS</title>
        <meta name="description" content="simple sns" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
	  <Header login={login} />
	  <div className="container">
		<RegisterPage />
	  </div>
    </div>
  )
}

export default Home
