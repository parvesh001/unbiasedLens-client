import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
const authorId = "6481b4f2e91479c2af9fc9fe";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDgxYjRmMmU5MTQ3OWMyYWY5ZmM5ZmUiLCJpYXQiOjE2ODc0MzUwMzMsImV4cCI6MTY4NzUyMTQzM30.DnWjVMKRD6vD9-77_sMNjZm83gAX3gk_-yq0X2XH2dA";

export default function BlogCards({ category }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/blog-posts?category=${category}`
        );
        if (!response) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        const posts = transformPosts(data.data.posts, authorId);
        setPosts(posts);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err);
      }
    })();
  }, [setPosts, category]);

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
        views: post.views,
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
      const response = await fetch(
        `http://localhost:8080/api/v1/blog-posts/post/${id}/${endpoint}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const likeHandler = async (id) => {
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
      <BlogCard
        post={post}
        key={post.id}
        onLike={likeHandler}
        onDislike={dislikeHandler}
        onRemoveLike={removeLikeHandler}
        onRemoveDislike={removeDislikeHandler}
      />
    );
  });

  if (isLoading) return <p> Loading posts....</p>;
  if (error) return <p>{error.message}</p>;
  if (!posts.length) return <p>No post found with this category</p>;
  return <>{content}</>;
}
