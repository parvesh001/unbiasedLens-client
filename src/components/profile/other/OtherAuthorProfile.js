import React, { useEffect, useState } from "react";
import Loading from "../../loadingSpinner/Loading";
import AuthorDetails from "../AuthorDetails";
import useHttp from "../../../hooks/use-http";
import styles from "./OtherAuthorProfile.module.scss";

export default function OtherAuthorProfile({ id }) {
  const { sendRequest: fetchAuthor } = useHttp();
  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetchAuthor({
          endpoint: `authors/author/${id}`,
        });
        setAuthor(response.data.author);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    })();
  }, [fetchAuthor, id]);

  if (isLoading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.otherAuthorProfile}>
      <AuthorDetails author={author} />
    </div>
  );
}
