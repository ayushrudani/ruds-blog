"use client";
import Image from "next/image";
// import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => signIn("google")}>
          <Image src="/google-icon.svg" width={30} height={30} />
          Sign in with Google
        </div>
        <div className={styles.socialButton}>
          <Image src="/github.png" width={30} height={30} />
          Sign in with Github
        </div>
        <div className={styles.socialButton}>
          <Image src="/facebook_icon.png" width={30} height={30} />
          Sign in with Facebook
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
