import Link from "next/link";
import React from "react";
import styles from "./page404.module.css";

const Page_404 = () => {
  return (
    <>
      <div className={styles.center}>
        <div className={styles.error}>
          <div className={styles.number}>4</div>
          <div className={styles.illustration}>
            <div className={styles.circle} />
            <div className={styles.clip}>
              <div className={styles.paper}>
                <div className={styles.face}>
                  <div className={styles.eyes}>
                    <div className={`${styles.eye} ${styles["eye-left"]}`} />
                    <div className={`${styles.eye} ${styles["eye-right"]}`} />
                  </div>
                  <div
                    className={`${styles.rosyCheeks} ${styles["rosyCheeks-left"]}`}
                  />
                  <div
                    className={`${styles.rosyCheeks} ${styles["rosyCheeks-right"]}`}
                  />
                  <div className={styles.mouth} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.number}>4</div>
        </div>
        <div className={styles.text}>
          Oops. The page you&#39;re looking for doesn&#39;t exist.
        </div>
        <Link href="/" className={styles.button}>
          Back Home
        </Link>
      </div>
    </>
  );
};

export default Page_404;
