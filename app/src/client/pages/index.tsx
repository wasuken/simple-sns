import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Router, { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'

import Header from "../componet/Header";
import { useUser } from "../context/user";

const Home: NextPage = () => {
  const { login } = useUser();
  const router = useRouter();
  const isReady = router.isReady;

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
		index
	  </div>
    </div>
  )
}

export default Home
