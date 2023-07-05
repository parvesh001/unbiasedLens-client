import React, { useContext, useEffect, useState } from "react";
import Loading from "../../loadingSpinner/Loading";
import BlogCard from "../..//blog/BlogCard";
import Alert from "../../../UI/Alert";
import NotFound from "../../notFound/NotFound";
import useHttp from "../../../hooks/use-http";
import { AuthContext } from "../../../context/authContext";
import styles from "./AuthorBlogs.module.scss";

export default function AuthorBlogs({ id }) {
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  const { author } = useContext(AuthContext);
  const { sendRequest: fetchAuthorBlogs } = useHttp();
  let authorId = author ? author._id : null;

  useEffect(() => {
    (async function () {
      try {
        const response = await fetchAuthorBlogs({
          endpoint: `authors/author/${id}/posts`,
        });
        const authorBlogs = transformPosts(response.data.authorPosts, authorId);
        setAuthorBlogs(authorBlogs);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [fetchAuthorBlogs, authorId, id]);

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

  if (isLoading) return <Loading />;
  if (!authorBlogs.length) return <NotFound />;
  if (error) return <p>{error}</p>;
  return (
    <>
      {alert && <Alert scenario={alert.scenario} message={alert.message} />}
      <div className={styles.authorBlogsContainer}>
        {authorBlogs.map((authorBlog) => {
          return (
            <BlogCard
              key={authorBlog.id}
              current={true}
              id={authorBlog.id}
              post={authorBlog}
            />
          );
        })}
      </div>
    </>
  );
}
