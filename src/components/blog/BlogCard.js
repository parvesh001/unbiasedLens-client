import React, { useReducer } from "react";
import {
  AiOutlineEye,
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import styles from "./BlogCard.module.scss";

const initialState = {
  isLiked: false,
  isDisliked: false,
  likes: 0,
  dislikes: 0,
  views: 0,
};
const blogReducer = (state, action) => {
  if (action.type === "Like") {
    return {
      isLiked: true,
      isDisliked: false,
      likes: state.likes + 1,
      dislikes: state.isDisliked ? state.dislikes - 1 : state.dislikes,
      views: state.views,
    };
  } else if (action.type === "Remove_Like") {
    return {
      isLiked: false,
      isDisliked: state.isDisliked,
      likes: state.likes - 1,
      dislikes: state.dislikes,
      views: state.views,
    };
  } else if (action.type === "Dislike") {
    return {
      isLiked: false,
      isDisliked: true,
      likes: state.isLiked ? state.likes - 1 : state.likes,
      dislikes: state.dislikes + 1,
      views: state.views,
    };
  } else if (action.type === "Remove_Dislike") {
    return {
      isLiked: state.isLiked,
      isDisliked: false,
      likes: state.likes,
      dislikes: state.dislikes - 1,
      views: state.views,
    };
  } else {
    return state;
  }
};

export default function BlogCard() {
  const [blogState, blogDispatch] = useReducer(blogReducer, initialState);

  const likeHandler = () => {
    blogDispatch({type:'Like'})
  };
  const removeLikeHandler = () => {
    blogDispatch({type:'Remove_Like'})
  };
  const dislikeHandler = () => {
    blogDispatch({type:'Dislike'})
  };
  const removeDislikeHandler = () => {
    blogDispatch({type:'Remove_Dislike'})
  };

  return (
    <div className={`card ${styles.blogCard}`}>
      <div className={styles.cardOverlayShadow} />
      <img src="/img/pexels.jpg" class="card-img w-100 h-100" alt="..." />
      <div class="card-img-overlay">
        <div className="card-subtitle">
          <div className="d-flex gap-2" style={{ cursor: "pointer" }}>
            <div className={styles.cardUserImg}>
              <img
                src="/img/user-1.jpg"
                className="w-100 rounded-circle"
                alt="author"
              />
            </div>
            <span className={styles.cardUserName}>Jatin</span>
          </div>
        </div>
        <div className="fs-4 text-center mt-2">
          <p>Inroduction To JavaScript</p>
        </div>
        <div className="position-absolute bottom-0 d-flex justify-content-between w-75">
          <div className="d-flex gap-4">
            <div className="d-flex flex-column align-items-center">
              {!blogState.isLiked && (
                <AiOutlineLike
                  className="fs-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => likeHandler()}
                />
              )}
              {blogState.isLiked && (
                <AiFillLike
                  className="fs-4 text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeLikeHandler()}
                />
              )}
              <span>{blogState.likes}</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              {!blogState.isDisliked && (
                <AiOutlineDislike
                  className="fs-4"
                  onClick={() => dislikeHandler()}
                  style={{ cursor: "pointer" }}
                />
              )}
              {blogState.isDisliked && (
                <AiFillDislike
                  className="fs-4 text-primary"
                  onClick={() => removeDislikeHandler()}
                  style={{ cursor: "pointer" }}
                />
              )}
              <span>{blogState.dislikes}</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              <AiOutlineEye className="fs-4" />
              <span>0</span>
            </div>
          </div>
          <div className="fs-5" style={{ cursor: "pointer" }}>
            <span>Read </span>
          </div>
        </div>
      </div>
    </div>
  );
}
