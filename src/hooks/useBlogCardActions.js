import useHttp from "./use-http";

const useBlogActions = () => {
  const { sendRequest: updatePostServer } = useHttp();

  const likeHandler = async (id, isLogedIn, posts, setPosts, token) => {
    if (!isLogedIn) throw new Error("Please register first");
    const post = posts.find((post) => post.id === id);
    updatePostsState(
      id,
      {
        likes: post.likes + 1,
        dislikes: post.isDisliked ? post.dislikes - 1 : post.dislikes,
        isLiked: true,
        isDisliked: false,
      },
      setPosts
    );

    await updatePostOnServer(id, "like", token);
  };

  const removeLikeHandler = async (id, isLogedIn, posts, setPosts, token) => {
    if (!isLogedIn) throw new Error("Please register first");
    const post = posts.find((post) => post.id === id);
    updatePostsState(id, { isLiked: false, likes: post.likes - 1 }, setPosts);
    await updatePostOnServer(id, "removeLike", token);
  };

  const dislikeHandler = async (id, isLogedIn, posts, setPosts, token) => {
    if (!isLogedIn) throw new Error("Please register first");

    const post = posts.find((post) => post.id === id);
    updatePostsState(
      id,
      {
        isDisliked: true,
        isLiked: false,
        dislikes: post.dislikes + 1,
        likes: post.isLiked ? post.likes - 1 : post.likes,
      },
      setPosts
    );
    await updatePostOnServer(id, "dislike", token);
  };

  const removeDislikeHandler = async (
    id,
    isLogedIn,
    posts,
    setPosts,
    token
  ) => {
    if (!isLogedIn) throw new Error("Please register first");
    const post = posts.find((post) => post.id === id);
    updatePostsState(
      id,
      { isDisliked: false, dislikes: post.dislikes - 1 },
      setPosts
    );
    await updatePostOnServer(id, "removeDislike", token);
  };

  const readPostHandler = async (id, isLogedIn, token) => {
    if (!isLogedIn) throw new Error("Please register first");
    await updatePostOnServer(id, "view", token);
  };

  const updatePostsState = (id, updatedProperties, setPosts) => {
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

  const updatePostOnServer = async (id, endpoint, token) => {
    await updatePostServer({
      endpoint: `blog-posts/post/${id}/${endpoint}`,
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  return {
    likeHandler,
    removeLikeHandler,
    dislikeHandler,
    removeDislikeHandler,
    readPostHandler,
  };
};

export default useBlogActions;
