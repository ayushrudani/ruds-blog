import React from "react";
import styles from "./cardListSkeleton.module.css";
const CardListSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.image}></div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <div className={styles.date}></div>
        </div>
        <h1 className={styles.title}></h1>
        <div className={styles.desc}></div>
        <div className={styles.desc}></div>
        <div className={styles.desc}></div>
        <div className={styles.desc}></div>
        <div className={styles.desc}></div>
      </div>
    </div>
  );
};

export default CardListSkeleton;
