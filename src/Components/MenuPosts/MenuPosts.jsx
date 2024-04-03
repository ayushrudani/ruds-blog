"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./menuPosts.module.css";
import baseURL from "@/utils/baseURL";
import MenuPostsSkeleton from "../Skeleton/MenuPostsSkeleton";

const MenuPosts = ({ withImage }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // get the top 4 posts
  function getTop4Posts() {
    fetch(`${baseURL}/posts/top`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setPosts(data);
          for (let i = 0; i < data.length; i++) {
            getUserDetails(data[i].userEmail);
          }
          setLoading(false);
        });
      }
    });
  }
  // get the user details
  function getUserDetails(userEmail) {
    // fetch the data from the API
    fetch(`${baseURL}/users/getUserByEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts((prev) =>
          prev.map((item) => {
            if (item.userEmail === userEmail) {
              return { ...item, username: data.name };
            }
            return item;
          })
        );
      });
  }
  useEffect(() => {
    getTop4Posts();
  }, []);

  return (
    <div className={styles.items}>
      {loading
        ? // loop of 4 to show the skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <MenuPostsSkeleton key={index} withImage={withImage} />
          ))
        : posts.map((post) => (
            <Link
              href={`/posts/${post.slug}`}
              className={styles.item}
              key={post._id}
            >
              {withImage && (
                <div className={styles.imageContainer}>
                  <Image src={post.img} alt="" fill className={styles.image} />
                </div>
              )}
              <div className={styles.textContainer}>
                <span
                  className={`${styles.category} ${
                    styles[post.catSlug.toLowerCase()]
                  }`}
                >
                  {post.catSlug}
                </span>
                <h3 className={styles.postTitle}>
                  {post.title.substring(0, 40) + "..."}
                </h3>
                <div className={styles.detail}>
                  <span className={styles.username}>{post.username}</span>
                  <span className={styles.date}>
                    {" "}
                    - {post.createdAt.substring(0, 10)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default MenuPosts;
