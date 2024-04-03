import React from "react";
import styles from "./myblog.module.css";
import Image from "next/image";
import Menu from "@/Components/Menu/Menu";
import Comments from "@/Components/Comments/Comments";

const MyBlog = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Embracing the Symphony of Nature: Finding Harmony in the Wilderness
          </h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image src="/profile.jpg" fill className={styles.avatar} />
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>Ayush Rudani</span>
              <span className={styles.date}>2024-04-02</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src="/nature.jpg" fill className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
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
            <p>
              As we journey through{" "}
              <strong>
                lush forests, tranquil meadows, and majestic mountains,
              </strong>{" "}
              we&#39;ll discover the interconnectedness of all living beings and
              the delicate balance that sustains life on our planet. Through
              captivating narratives and awe-inspiring photographs, we&#39;ll
              witness the resilience of ecosystems and the intricate
              relationships between flora and fauna.
            </p>

            <blockquote>
              <p>
                &#34;Nature holds invaluable lessons for humanity. As we tread
                lightly upon the earth, we learn the importance of conservation
                and stewardship, recognizing our role as custodians of this
                precious planet.&#34;
              </p>
            </blockquote>

            <p>
              So, let us venture forth into the wilderness with{" "}
              <strong>open hearts and curious minds,</strong> ready to embrace
              the beauty, wisdom, and wonder that await us. Through our
              collective exploration of nature&#39;s bounty, we discover not
              only the magnificence of the world around us but also the
              boundless potential within ourselves. Join us as we journey into
              the heart of the wild, guided by the timeless rhythms of the
              natural world and fueled by a shared reverence for life in all its
              forms.
            </p>
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

            <p>
              As we journey through{" "}
              <strong>
                lush forests, tranquil meadows, and majestic mountains,
              </strong>{" "}
              we&#39;ll discover the interconnectedness of all living beings and
              the delicate balance that sustains life on our planet. Through
              captivating narratives and awe-inspiring photographs, we&#39;ll
              witness the resilience of ecosystems and the intricate
              relationships between flora and fauna.
            </p>

            <blockquote>
              <p>
                &#34;Nature holds invaluable lessons for humanity. As we tread
                lightly upon the earth, we learn the importance of conservation
                and stewardship, recognizing our role as custodians of this
                precious planet.&#34;
              </p>
            </blockquote>

            <p>
              Moreover, immersing ourselves in the wilderness fosters a deep
              sense of connection and belonging. In nature&#39;s embrace, we
              find refuge from the chaos of modernity, grounding ourselves in
              the simplicity of existence. Whether it&#39;s a solitary hike
              through ancient forests or a shared moment of wonder beneath a
              star-studded sky,{" "}
              <strong>
                nature beckons us to rediscover our intrinsic bond with the
                natural world.
              </strong>
            </p>

            <p>
              Through this blog, we invite you to embark on a sensory journey
              that transcends the confines of screens and cityscapes. Feel the
              soft caress of moss beneath your fingertips, inhale the earthy
              aroma of damp soil after a summer rain, and listen to the gentle
              lullaby of flowing streams. As we immerse ourselves in the sights,
              sounds, and textures of nature, we awaken dormant senses and
              cultivate a deeper appreciation for the world around us.
            </p>
          </div>
          <div className={styles.comment}>
            <Comments postSlug="My-Blog-Ayush" />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default MyBlog;
