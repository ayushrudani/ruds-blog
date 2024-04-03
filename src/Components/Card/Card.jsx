import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

const Card = ({ items }) => {
  return (
    // map the items to the card
    items.map((item) => {
      return (
        <div className={styles.container} key={item._id}>
          <div className={styles.imageContainer}>
            {item.img && (
              <Image
                src={item.img}
                alt=""
                sizes="(max-width: 600px) 100vw, 600px"
                fill
                className={styles.image}
              />
            )}
          </div>
          <div className={styles.textContainer}>
            <div className={styles.detail}>
              <span className={styles.date}>
                {item.createdAt.substring(0, 10)} -{" "}
              </span>
              <span className={styles.category}>{item.catSlug}</span>
            </div>
            <Link href="/">
              <h1 className={styles.title}>{item.title}</h1>
            </Link>
            <p
              className={styles.desc}
              dangerouslySetInnerHTML={{
                __html: item.desc.substring(0, 100) + "...",
              }}
            ></p>
            <Link href={`/posts/${item.slug}`} className={styles.link}>
              Read More
            </Link>
          </div>
        </div>
      );
    })
  );
};

export default Card;
