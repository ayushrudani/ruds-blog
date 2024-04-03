"use client";
import React, { useEffect, useState } from "react";
import styles from "./singlePage.module.css";
import Menu from "@/Components/Menu/Menu";
import Image from "next/image";
import Comments from "@/Components/Comments/Comments";
import baseURL from "@/utils/baseURL";
import Page_404 from "@/app/[slug]/page";
import Loader from "@/Components/Loader/Loader";
const SinglePage = ({ params }) => {
  // get the slug from the searchParams
  const { slug } = params;
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [postFound, setPostFound] = useState(true);
  const [user, setUser] = useState({});

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
        setUser(data);
      });
  }
  // get the post by slug
  function getPostBySlug() {
    // fetch the data from the API
    fetch(`${baseURL}/posts/getPostBySlug`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: slug }),
    })
      .then((response) => {
        if (response.status !== 200) {
          setPostFound(false);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        getUserDetails(data.userEmail);
        updateViewCount();
        setLoading(false);
      });
  }
  // update View count
  function updateViewCount() {
    fetch(`${baseURL}/posts/updateViews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: slug }),
    });
  }

  useEffect(() => {
    getPostBySlug();
  }, [slug]);
  return postFound ? (
    loading ? (
      <Loader />
    ) : (
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.user}>
              <div className={styles.userImageContainer}>
                <Image src={user.image} fill className={styles.avatar} />
              </div>
              <div className={styles.userTextContainer}>
                <span className={styles.username}>{user.name}</span>
                <span className={styles.date}>{post.createdAt}</span>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            {post.img && <Image src={post.img} fill className={styles.image} />}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.post}>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: post.desc }}
            ></div>
            <div className={styles.comment}>
              <Comments postSlug={slug} />
            </div>
          </div>
          <Menu />
        </div>
      </div>
    )
  ) : (
    <Page_404 />
  );
};

export default SinglePage;
