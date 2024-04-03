"use client";
import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Featured = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Ayush Rudani here!</b> Discover my stories and creative ideas.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image
            src="/nature.jpg"
            alt=""
            sizes="(max-width: 600px) 100vw, 600px"
            fill
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            Embracing the Symphony of Nature: Finding Harmony in the Wilderness
          </h1>
          <p className={styles.postDesc}>
            <p>
              In the bustling cacophony of modern life, it&#39;s all too easy to
              forget the serene symphony that plays out in the natural world
              around us. From the whispering of leaves in the wind to the
              melodious chirping of birds at dawn,{" "}
              <strong>
                nature&#39;s rhythm surrounds us, waiting to be appreciated.
              </strong>{" "}
              In this blog, we delve into the enchanting beauty of the
              wilderness, exploring its wonders and the profound lessons it
              offers to those who pause to listen.
            </p>
          </p>
          <button
            className={styles.button}
            onClick={() => {
              router.push("/myblog");
            }}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
