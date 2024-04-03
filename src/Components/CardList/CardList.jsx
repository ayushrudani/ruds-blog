"use client";
import React, { useEffect, useState } from "react";
import styles from "./cardList.module.css";
import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import Card from "../Card/Card";
import CardListSkeleton from "../Skeleton/CardListSkeleton";
import baseURL from "@/utils/baseURL";

const CardList = ({ page, cat }) => {
  // cunsume the posts from the API of .NET Core
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postCount, setPostCount] = useState(0);
  function getposts() {
    // fetch the data from the API
    fetch(`${baseURL}/posts/getPosts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cat: cat || "", page: page }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data.posts);
        setPostCount(data.total);
        setHasNext(data.total > (page - 1) * 5 + data.posts.length);
        setLoading(false);
      });
  }
  useEffect(() => {
    getposts();
  }, [page]);
  const Post_Per_Page = 5;
  const hasPre = Post_Per_Page * (page - 1) > 0;
  const [hasNext, setHasNext] = useState(true);
  return (
    <div className={styles.container}>
      <h1 className={styles.title} id="titlePost">
        Latest Posts
      </h1>
      <div className={styles.posts}>
        {
          // if the data is loading, show the loading message
          loading ? (
            <CardListSkeleton />
          ) : (
            // if the data is loaded, show the posts

            <Card items={posts} />
          )
        }
      </div>
      <Pagination page={page} hasNext={hasNext} hasPre={hasPre} />
    </div>
  );
};

export default CardList;
