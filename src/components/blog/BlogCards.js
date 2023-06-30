import React, { useContext, useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import NotFound from "../notFound/NotFound";
import Loading from "../loadingSpinner/Loading";
import Alert from "../../UI/Alert";
import { AuthContext } from "../../context/authContext";
import useHttp from "../../hooks/use-http";

export default function BlogCards({ category }) {
  const { sendRequest: fetchBlogs } = useHttp();
  const { sendRequest: updatePost } = useHttp();
  const { author, token, isLogedIn } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  let authorId = author ? author._id : null;

  useEffect(() => {
    (async function () {
      try {
        const data = await fetchBlogs({
          endpoint: `blog-posts?category=${category}`,
        });
        const posts = transformPosts(data.data.posts, authorId);
        setPosts(posts);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw new Error(err.message);
      }
    })();
  }, [setPosts, category, authorId, fetchBlogs]);

  const transformPosts = (postsData, authorId) => {
    return postsData.map((post) => {
      return {
        id: post._id,
        author: post.author.name,
        authorImg: post.author.photo,
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

  const updatePostsState = (id, updatedProperties) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            ...updatedProperties,
          };
        }
        return post;
      });
    });
  };

  const updatePostOnServer = async (id, endpoint) => {
    try {
      await updatePost({
        endpoint: `blog-posts/post/${id}/${endpoint}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const likeHandler = async (id) => {
    if (!isLogedIn)
      return setAlert({ scenario: "error", message: "please register first" });
    const post = posts.find((post) => post.id === id);
    updatePostsState(id, {
      likes: post.likes + 1,
      dislikes: post.isDisliked ? post.dislikes - 1 : post.dislikes,
      isLiked: true,
      isDisliked: false,
    });

    await updatePostOnServer(id, "like");
  };

  const removeLikeHandler = async (id) => {
    const post = posts.find((post) => post.id === id);
    updatePostsState(id, { isLiked: false, likes: post.likes - 1 });

    await updatePostOnServer(id, "removeLike");
  };

  const dislikeHandler = async (id) => {
    const post = posts.find((post) => post.id === id);
    updatePostsState(id, {
      isDisliked: true,
      isLiked: false,
      dislikes: post.dislikes + 1,
      likes: post.isLiked ? post.likes - 1 : post.likes,
    });
    await updatePostOnServer(id, "dislike");
  };

  const removeDislikeHandler = async (id) => {
    const post = posts.find((post) => post.id === id);
    updatePostsState(id, { isDisliked: false, dislikes: post.dislikes - 1 });
    await updatePostOnServer(id, "removeDislike");
  };

  let content = posts.map((post) => {
    return (
      <div className="col" key={post.id}>
        <BlogCard
          post={post}
          onLike={() => likeHandler(post.id)}
          onDislike={() => dislikeHandler(post.id)}
          onRemoveLike={() => removeLikeHandler(post.id)}
          onRemoveDislike={() => removeDislikeHandler(post.id)}
        />
      </div>
    );
  });

  if (isLoading) return <Loading />;
  if (!posts.length) return <NotFound />;

  return (
    <>
     { alert && <Alert
        scenario={alert.scenario}
        message={alert.message}
        dismiss={() => setAlert(null)}
      />}
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-3 g-3">{content}</div>
      </div>
    </>
  );
}
