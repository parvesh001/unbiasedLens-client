import React, { useContext, useState, useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import { AuthContext } from "../../../context/authContext";
import Loading from "../../loadingSpinner/Loading";
import BlogCard from "../BlogCard";
import useBlogActions from "../../../hooks/useBlogCardActions";
import styles from "./CategoryBlogs.module.scss";
import Alert from "../../../UI/Alert";

export default function CategoryBlogs({ category }) {
  const { author, isLogedIn, token } = useContext(AuthContext);
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  const { sendRequest: fetchBlogs } = useHttp();
  const {
    likeHandler,
    removeLikeHandler,
    dislikeHandler,
    removeDislikeHandler,
    readPostHandler,
  } = useBlogActions();

  let authorId = author ? author._id : null;

  useEffect(() => {
    (async function () {
      try {
        const data = await fetchBlogs({
          endpoint: `blog-posts?category=${category}`,
        });
        const categoryBlogs = transformPosts(data.data.posts, authorId);
        setCategoryBlogs(categoryBlogs);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    })();
  }, [setCategoryBlogs, category, authorId, fetchBlogs]);

  const transformPosts = (postsData, authorId) => {
    return postsData.map((post) => {
      return {
        id: post._id,
        author: post.author.name,
        authorImg: post.author.photo,
        authorId: post.author._id,
        title: post.title,
        image: post.image,
        likes: post.likes.length,
        dislikes: post.dislikes.length,
        isLiked: post.likes.includes(authorId),
        isDisliked: post.dislikes.includes(authorId),
        views: post.views.length,
        slug: post.slug,
      };
    });
  };

  const categoryBlogLikeHandler = async (id) => {
    try {
      await likeHandler(id, isLogedIn, categoryBlogs, setCategoryBlogs, token);
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const categoryBlogRemoveLikeHander = async (id) => {
    try {
      await removeLikeHandler(
        id,
        isLogedIn,
        categoryBlogs,
        setCategoryBlogs,
        token
      );
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const categoryBlogDislikeHandler = async (id) => {
    try {
      await dislikeHandler(
        id,
        isLogedIn,
        categoryBlogs,
        setCategoryBlogs,
        token
      );
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const categoryBlogRemoveDislikeHandler = async (id) => {
    try {
      await removeDislikeHandler(
        id,
        isLogedIn,
        categoryBlogs,
        setCategoryBlogs,
        token
      );
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const categoryBlogReadHandler = async (id) => {
    try {
      await readPostHandler(id, isLogedIn, token);
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <p>{error}</p>;

  let blogCards = categoryBlogs.map((blog) => {
    return (
      <BlogCard
        key={blog.id}
        post={blog}
        onRead={categoryBlogReadHandler.bind(null, blog.id)}
        onLike={categoryBlogLikeHandler.bind(null, blog.id)}
        onDislike={categoryBlogDislikeHandler.bind(null, blog.id)}
        onRemoveDislike={categoryBlogRemoveDislikeHandler.bind(null, blog.id)}
        onRemoveLike={categoryBlogRemoveLikeHander.bind(null, blog.id)}
      />
    );
  });

  return (
    <>
      {alert && (
        <Alert
          scenario={alert.scenario}
          message={alert.message}
          dismiss={() => setAlert(null)}
        />
      )}
      <div className={styles.categoryBlogsContainer}>{blogCards}</div>
    </>
  );
}
