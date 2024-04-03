"use client";
import React, { useEffect, useState } from "react";
import styles from "./write.module.css";
import Image from "next/image";
import "react-quill/dist/quill.bubble.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import { toast } from "react-toastify";
import baseURL from "@/utils/baseURL";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const storage = getStorage(app);

const Write = () => {
  const status = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState({
    title: "",
    category: "",
    desc: "",
    fileURL: "",
  });

  useEffect(() => {
    getCategories();
    const upload = () => {
      const name = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      toast.info("Uploading Image", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress === 100) {
            setOpen(false);
            toast.success("Image Uploaded", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          toast.error("Error Uploading Image", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInput({ ...input, fileURL: downloadURL });
          });
        }
      );
    };
    file && upload();
  }, [file]);

  const sluggify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const errorMessage = ({ message }) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  // handle submit
  const handleSubmit = async () => {
    if (input.title === "") {
      errorMessage({ message: "Title is required" });
      return;
    }
    if (input.category === "") {
      errorMessage({ message: "Select Category" });
      return;
    }
    if (input.desc === "") {
      errorMessage({ message: "Description is required" });
      return;
    }
    if (input.fileURL === "") {
      errorMessage({ message: "Image is required" });
      return;
    }

    await fetch(`${baseURL}/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: sluggify(input.title),
        desc: input.desc,
        img: input.fileURL,
        title: input.title,
        catSlug: input.category,
        userEmail: status.data?.user?.email,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          toast.success("Post Created", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          router.push(`/`);
        }
      });
  };

  if (status.status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status.status !== "authenticated") {
    router.push("/");
  }
  // get categories
  function getCategories() {
    fetch(`${baseURL}/categories`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      });
  }

  return (
    <div className={styles.container}>
      <select
        className={styles.dropdown}
        onChange={(e) => setInput({ ...input, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category.slug}>
            {category.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        className={styles.input}
        placeholder="Title"
        onChange={(e) => setInput({ ...input, title: e.target.value })}
      />

      <div className={styles.editor}>
        <button
          className={styles.button}
          onClick={
            // open add button for 6 seconds
            () => {
              setOpen(!open);
            }
          }
        >
          <Image src="/plus_icon.png" width={40} height={40} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="image">
              <div className={styles.addButton}>
                <Image src="/photo_icon.png" width={25} height={25} />
              </div>
            </label>
            <div className={styles.addButton}>
              <Image src="/upload_icon.png" width={20} height={20} />
            </div>
            <div className={styles.addButton}>
              <Image src="/media_icon.png" width={25} height={25} />
            </div>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={input.desc}
          placeholder="Tell your story..."
          onChange={(value) => setInput({ ...input, desc: value })}
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default Write;
