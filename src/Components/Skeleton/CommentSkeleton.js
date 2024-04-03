import React from "react";
import styles from "./commentSkeleton.module.css";

const CommentSkeleton = () => {
  return (
    <div className={styles.comment}>
      <div className={styles.user}>
        <div className={styles.image}></div>
        <div className={styles.userInfo}>
          <div className={styles.username}></div>
          <div className={styles.date}></div>
        </div>
      </div>
      <div className={styles.descContainer}>
        <div className={styles.desc}></div>
        <div className={styles.desc}></div>
        <div className={styles.desc}></div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
