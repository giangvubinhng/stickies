import Head from "next/head";
import { signIn, signOut, useSession } from 'next-auth/react';



const Login = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Head>
          <title>Sign In</title>
        </Head>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <button onClick={() => signIn('google')}>Sign in</button>
    </>
  )
}

export default Login;

