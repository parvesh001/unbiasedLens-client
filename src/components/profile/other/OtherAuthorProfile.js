import React, { useContext, useEffect, useState } from "react";
import Loading from "../../loadingSpinner/Loading";
import AuthorDetails from "../AuthorDetails";
import useHttp from "../../../hooks/use-http";
import AuthorStats from "../AuthorStats";
import styles from "./OtherAuthorProfile.module.scss";
import { AuthContext } from "../../../context/authContext";
import Alert from "../../../UI/Alert";

export default function OtherAuthorProfile({ id }) {
  const [otherAuthor, setOtherAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [showFollowings, setShowFollowings] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const { sendRequest: fetchOtherAuthor } = useHttp();
  const { sendRequest: followOtherAuthor } = useHttp();
  const { sendRequest: unfollowOtherAuthor } = useHttp();
  const { token, isLogedIn, author } = useContext(AuthContext);

  const alreadyFollowed =
    author &&
    otherAuthor &&
    otherAuthor.followers.find((follower) => follower._id === author._id);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetchOtherAuthor({
          endpoint: `authors/author/${id}`,
        });
        setOtherAuthor(response.data.author);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    })();
  }, [fetchOtherAuthor, id]);

  const authorFollowHandler = async () => {
    if (!isLogedIn)
      return setAlert({ scenario: "error", message: "Please register first" });

    try {
      await followOtherAuthor({
        endpoint: `follow/author/${otherAuthor._id}`,
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      });

      const { _id, name, email, photo } = author;
      setAlert({ scenario: "success", message: "Author followed" });
      setOtherAuthor((prevAuthor) => {
        let newFollowers = [
          ...prevAuthor.followers,
          { _id, name, email, photo },
        ];
        return {
          ...prevAuthor,
          followers: newFollowers,
        };
      });
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  const authorUnfollowHandler = async () => {
    if (!isLogedIn)
      return setAlert({ scenario: "error", message: "Please register first" });

    try {
      await unfollowOtherAuthor({
        endpoint: `unfollow/author/${otherAuthor._id}`,
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });

      setAlert({ scenario: "success", message: "Author unfollowed" });
      setOtherAuthor((prevAuthor) => {
        const filteredFollowers = prevAuthor.followers.filter(
          (follower) => follower._id !== author._id
        );
        return { ...prevAuthor, followers: filteredFollowers };
      });
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <p className="text-light fs-4">{error}</p>;

  return (
    <>
      {alert && (
        <Alert
          scenario={alert.scenario}
          message={alert.message}
          dismiss={() => setAlert(null)}
        />
      )}
      {showFollowers && (
        <AuthorStats
          title={`${otherAuthor.name}'s Followers`}
          data={otherAuthor.followers}
          emptyMessage={`${otherAuthor.name} don't have any follower`}
          onClose={() => setShowFollowers(false)}
        />
      )}
      {showFollowings && (
        <AuthorStats
          title={`${otherAuthor.name}'s Followings`}
          data={otherAuthor.followings}
          emptyMessage={`${otherAuthor.name} don't have any following`}
          onClose={() => setShowFollowings(false)}
        />
      )}
      <div className={styles.otherAuthorProfile}>
        <AuthorDetails
          author={otherAuthor}
          current={false}
          alreadyFollowed={alreadyFollowed}
          onShowFollowers={() => setShowFollowers(true)}
          onShowFollowings={() => setShowFollowings(true)}
          onFollow={authorFollowHandler}
          onUnfollow={authorUnfollowHandler}
        />
      </div>
    </>
  );
}
