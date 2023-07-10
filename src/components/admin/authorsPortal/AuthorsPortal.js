import React, { useContext, useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import { AuthContext } from "../../../context/authContext";
import Loading from "../../loadingSpinner/Loading";
import AuthorCard from "./AuthorCard";
import Alert from "../../../UI/Alert";
import Pagination from "../../pagination/Pagination";
import styles from "./AuthorsPortal.module.scss";

export default function AuthorsPortal() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const { token } = useContext(AuthContext);
  const { sendRequest: fetchAuthors } = useHttp();
  const { sendRequest: blockUnblockAuthor } = useHttp();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const docsLimit = 4;

  useEffect(() => {
    (async function () {
      try {
        const response = await fetchAuthors({
          endpoint: `authors?page=${currentPage}&limit=${docsLimit}`,
          headers: { Authorization: "Bearer " + token },
        });
        const { authors, totalDocs } = response.data;
        setAuthors(authors);
        setTotalPages(Math.ceil(totalDocs / docsLimit));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    })();
  }, [fetchAuthors, token, currentPage, docsLimit]);

  const authorBlockToggleHandler = async (id) => {
    const author = authors.filter((author) => author._id === id);
    const endpoint = author[0].blocked
      ? `authors/author/${id}/unblock`
      : `authors/author/${id}/block`;
    const message = author[0].blocked ? "Author Unblocked" : "Author Blocked";
    try {
      await blockUnblockAuthor({
        endpoint,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAuthors((prevAuthors) => {
        return prevAuthors.map((prevAuthor) => {
          if (prevAuthor._id === id) {
            return { ...prevAuthor, blocked: !prevAuthor.blocked };
          }
          return prevAuthor;
        });
      });
      setAlert({ scenario: "success", message });
    } catch (err) {
      setAlert({ scenario: "error", message: err.message });
    }
  };

  if (isLoading) return <Loading />;
  if (error)
    return <h4 className="fs-4 text-center mt-5 text-light">{error}</h4>;

  let content = authors.map((author) => {
    return (
      <AuthorCard
        key={author._id}
        author={author}
        isBlocked={author.blocked}
        onToggleBlock={authorBlockToggleHandler.bind(null, author._id)}
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
      <div className={styles.authorsPortal}>
        <h4 className={styles.portalTitle}>Available Authors</h4>
        <div className={styles.authorCards}>{content}</div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
