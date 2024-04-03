import React from "react";
import styles from "./cardListSkeleton.module.css";
const CardListSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}></div>
      <div className={styles.textContainer}>
        <div className={styles.date}></div>
        <div className={styles.titleContainer}>
          <div className={styles.title}></div>
          <div className={styles.title} style={{ width: "70%" }}></div>
        </div>
        <div className={styles.descContainer}>
          <div className={styles.desc}></div>
          <div className={styles.desc}></div>
        </div>
        <div className={styles.read}></div>
      </div>
    </div>
  );
};

export default CardListSkeleton;
