"use client";
import React, { useEffect, useState } from "react";
import styles from "./comments.module.css";
import Image from "next/image";

import { useSession } from "next-auth/react";
import Link from "next/link";
import baseURL from "@/utils/baseURL";
import CommentSkeleton from "../Skeleton/CommentSkeleton";
const Comments = ({ postSlug }) => {
  const status = useSession();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [desc, setDesc] = useState("");

  //  post the comment to the API
  const handleSubmit = async () => {
    if (desc === "") {
      return;
    }
    await fetch(`${baseURL}/comments/postComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        desc: desc,
        userEmail: status.data?.user?.email,
        postSlug: postSlug,
        createdAt: new Date(),
      }),
    }).then(() => {
      getComments();
      setDesc("");
    });
  };

  // get the comments from the API
  function getComments() {
    // fetch the data from the API
    fetch(`${baseURL}/comments/getCommentsByPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postSlug: postSlug }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        for (let i = 0; i < data.length; i++) {
          getUserDetails(data[i].userEmail);
        }
        setIsLoading(false);
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
        setData((prevData) => {
          return prevData.map((item) => {
            if (item.userEmail === userEmail) {
              return { ...item, username: data.name, userImage: data.image };
            }
            return item;
          });
        });
      });
  }

  useEffect(() => {
    getComments();
  }, [postSlug]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status.status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            className={styles.input}
            placeholder="Write a comment..."
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {isLoading
          ? // for loop to create 5 skeleton comments
            Array.from({ length: 5 }).map((_, index) => (
              <CommentSkeleton key={index} />
            ))
          : data?.map((comment) => (
              <div className={styles.comment} key={comment._id}>
                <div className={styles.user}>
                  <Image
                    src={comment.userImage}
                    alt=""
                    width={50}
                    height={50}
                    className={styles.image}
                  />
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{comment.username}</span>
                    <span className={styles.date}>
                      {comment.createdAt.substring(0, 10)}
                    </span>
                  </div>
                </div>
                <p className={styles.desc}>{comment.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;
