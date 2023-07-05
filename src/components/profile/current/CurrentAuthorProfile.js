import React, { useContext, useEffect, useState } from "react";
import CurrentAuthorUpdateForm from "./CurrentAuthorUpdateForm";
import AuthorDetails from "../AuthorDetails";
import { AuthContext } from "../../../context/authContext";
import useHttp from "../../../hooks/use-http";
import AuthorStats from "../AuthorStats";
import Alert from "../../../UI/Alert";
import Loading from "../../loadingSpinner/Loading";
import styles from "./CurrentAuthorProfile.module.scss";

export default function CurrentAuthorProfile() {
  const { sendRequest: fetchCurrentAuthor } = useHttp();
  const { token } = useContext(AuthContext);
  const [currentAuthor, setCurrentAuthor] = useState({});
  const [showProfileViewers, setShowProfileViewers] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetchCurrentAuthor({
          endpoint: "authors/getMe",
          headers: { Authorization: "Bearer " + token },
        });
        setCurrentAuthor(response.data.author);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    })();
  }, [fetchCurrentAuthor, token]);

  if (isLoading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <>
      {alert && (
        <Alert
          scenario={alert.scenario}
          message={alert.message}
          dismiss={() => setAlert(null)}
        />
      )}
      {showProfileViewers && (
        <AuthorStats
          title="Profile Viewers"
          data={currentAuthor.profileViewers}
          emptyMessage="You don't have any profile viewers"
          onClose={() => setShowProfileViewers(false)}
        />
      )}
      {showFollowers && (
        <AuthorStats
          title="Your Followers"
          data={currentAuthor.followers}
          emptyMessage="You don't have any followers"
          onClose={() => setShowFollowers(false)}
        />
      )}
      {showFollowings && (
        <AuthorStats
          title="Your Followings"
          data={currentAuthor.followings}
          emptyMessage="You don't have any followings"
          onClose={() => setShowFollowings(false)}
        />
      )}
      <div className={styles.currentAuthorProfile}>
        <AuthorDetails
          current={true}
          author={currentAuthor}
          onShowProfileViewers={() => setShowProfileViewers(true)}
          onShowFollowers={() => setShowFollowers(true)}
          onShowFollowings={() => setShowFollowings(true)}
        />
        <CurrentAuthorUpdateForm />
      </div>
    </>
  );
}