"use client";
import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

const Pagination = ({ page, hasPre, hasNext }) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPre}
        onClick={() => {
          router.push(`?page=${page - 1}#titlePost`);
        }}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => {
          router.push(`?page=${page + 1}#titlePost`);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
