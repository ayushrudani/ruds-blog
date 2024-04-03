"use client";
import React, { useEffect, useState } from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import CategorySkeleton from "../Skeleton/CategorySkeleton";
import baseURL from "@/utils/baseURL";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  function getCategories() {
    // fetch the data from the API
    fetch(`${baseURL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Categories</h1>
      <div className={styles.categories}>
        {
          // if the data is loading, show the loading message
          loading
            ? // show the skeleton loader while the data is loading 5 times
              Array.from({ length: 6 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))
            : // if the data is loaded, show the categories
              categories.map((category) => {
                return (
                  <Link
                    key={category._id}
                    href={`/blog?cat=${category.slug.toLowerCase()}`}
                    className={`${styles.category} ${
                      styles[category.title.toLowerCase()]
                    }`}
                  >
                    <Image
                      src={category.img}
                      alt={category.title}
                      width={32}
                      height={32}
                      className={styles.image}
                    />
                    {category.title}
                  </Link>
                );
              })
        }
      </div>
    </div>
  );
};

export default CategoryList;
