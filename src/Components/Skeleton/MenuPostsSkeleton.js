import React from "react";
import styles from "./menuPostsSkeleton.module.css";
const MenuPostsSkeleton = ({ withImage }) => {
  return (
    <div className={styles.item}>
      {withImage && (
        <div className={styles.imageContainer}>
          <div className={styles.image}></div>
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.category}></div>
        <div className={styles.postTitle}></div>
        <div className={styles.detail}></div>
      </div>
    </div>
  );
};

export default MenuPostsSkeleton;
