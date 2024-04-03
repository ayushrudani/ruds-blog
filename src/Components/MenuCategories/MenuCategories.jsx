"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./menuCategories.module.css";
import baseURL from "@/utils/baseURL";

const MenuCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchCategories() {
    fetch(`${baseURL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={styles.categoryList}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        categories.map((category) => (
          <Link key={category._id} href={`/blog?cat=${category.slug}`}>
            <p
              className={`${styles.categoryItem} ${
                styles[category.title.toLowerCase()]
              }`}
            >
              {category.title}
            </p>
          </Link>
        ))
      )}
    </div>
  );
};

export default MenuCategories;
