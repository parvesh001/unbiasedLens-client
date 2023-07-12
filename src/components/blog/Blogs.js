import React, { useContext, useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { AuthContext } from "../../context/authContext";
import Loading from "../loadingSpinner/Loading";
import BlogCard from "./BlogCard";
import useBlogActions from "../../hooks/useBlogCardActions";
import NotFound from "../notFound/NotFound";
import styles from "./Blogs.module.scss";
import Alert from "../../UI/Alert";
import Pagination from "../pagination/Pagination";

export default function Blogs({ uniqueEndpoint, current }) {
  const { author, isLogedIn, token } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const docsLimit = 6;

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
          endpoint: `${uniqueEndpoint}&page=${currentPage}&limit=${docsLimit}`,
        });
        let { posts, totalDocs } = data.data;
        let transformedPosts = transformPosts(posts, authorId);
        setBlogs(transformedPosts);
        setTotalPages(Math.ceil(totalDocs / docsLimit));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    })();
  }, [setBlogs, uniqueEndpoint, authorId, fetchBlogs, currentPage]);

  const transformPosts = (postsData, authorId) => {
    return postsData.map((post) => {
      return {
        id: post._id,
        author: post.author.name,
        authorImg: post.author.photo,
        authorId: post.author._id,
        authorEmail: post.author.email,
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

  const blogLikeHandler = async (id) => {
    try {
      await likeHandler(id, isLogedIn, blogs, setBlogs, token);
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const blogRemoveLikeHander = async (id) => {
    try {
      await removeLikeHandler(id, isLogedIn, blogs, setBlogs, token);
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const blogDislikeHandler = async (id) => {
    try {
      await dislikeHandler(id, isLogedIn, blogs, setBlogs, token);
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const blogRemoveDislikeHandler = async (id) => {
    try {
      await removeDislikeHandler(id, isLogedIn, blogs, setBlogs, token);
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const blogReadHandler = async (id) => {
    try {
      await readPostHandler(id, isLogedIn, token);
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  if (isLoading) return <Loading />;
  if (error)
    return <p className="text-light fw-bold text-center fs-4">{error}</p>;
  if (!blogs.length) return <NotFound />;

  let blogCards = blogs.map((blog) => {
    return (
      <BlogCard
        key={blog.id}
        post={blog}
        current={current}
        onRead={blogReadHandler.bind(null, blog.id)}
        onLike={blogLikeHandler.bind(null, blog.id)}
        onDislike={blogDislikeHandler.bind(null, blog.id)}
        onRemoveDislike={blogRemoveDislikeHandler.bind(null, blog.id)}
        onRemoveLike={blogRemoveLikeHander.bind(null, blog.id)}
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
      <div
        className={styles.blogsContainer}
      >
        <div className={styles.blogs}>{blogCards}</div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
