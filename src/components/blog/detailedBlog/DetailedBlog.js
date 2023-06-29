import React, { useEffect, useState } from "react";
import styles from "./DetailedBlog.module.scss";
import DetailedBlogHeader from "./DetailedBlogHeader";
import DetailedBlogBody from "./DetailedBlogBody";
import Alert from "../../../UI/Alert";
import CommentBoard from "../../comments/CommentBoard";
import Loading from "../../../components/loadingSpinner/Loading";
import useHttp from "../../../hooks/use-http";

export default function DetailedBlog({ blogId }) {
  const [blogPost, setBlogPost] = useState({});
  const [comments, setComments] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { sendRequest: fetchBlogPost } = useHttp();
  const { sendRequest: fetchBlogComments } = useHttp();

  useEffect(() => {
    const fetchBlogPostWithComments = async () => {
      try {
        const response1 = await fetchBlogPost({
          endpoint: `blog-posts/post/${blogId}`,
        });
        const response2 = await fetchBlogComments({
          endpoint: `comments/blogPost/${blogId}`,
        });

        const post = response1.data.post;
        const comments = response2.data.comments;

        setBlogPost(post);
        setComments(comments);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setAlert({ scenario: "error", message: err.message });
      }
    };
    fetchBlogPostWithComments();
  }, [blogId, fetchBlogComments, fetchBlogPost]);

  if (isLoading) return <Loading />;


  return (
    <>
      {alert && (
        <Alert
          scenario={alert.scenario}
          message={alert.message}
          dismiss={() => setAlert(null)}
        />
      )}
      <div className={styles.detailedBlogContainer}>
        <DetailedBlogHeader author={blogPost.author} blogPost={blogPost} />
        <DetailedBlogBody content={blogPost.content} />
        <CommentBoard comments={comments} />
      </div>
    </>
  );
}
