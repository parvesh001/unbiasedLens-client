import React, { useContext, useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import { AuthContext } from "../../../context/authContext";
import Loading from "../../loadingSpinner/Loading";
import AuthorCard from "./AuthorCard";
import Alert from "../../../UI/Alert";

export default function AuthorsPortal() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const { token } = useContext(AuthContext);
  const { sendRequest: fetchAuthors } = useHttp();
  const { sendRequest: blockUnblockAuthor } = useHttp();

  useEffect(() => {
    (async function () {
      try {
        const response = await fetchAuthors({
          endpoint: "authors",
          headers: { Authorization: "Bearer " + token },
        });
        setAuthors(response.data.authors);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    })();
  }, [fetchAuthors, token]);

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
    return (
      <h4
        className="fs-4 text-center mt-5 text-light"
      >
        {error}
      </h4>
    );

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
      {alert && <Alert scenario={alert.scenario} message={alert.message} dismiss={()=>setAlert(null)}/>}
      <div className="py-3 px-1 py-md-5 px-md-3">
        <h4 className="text-light text-uppercase mb-2 mb-3">
          Available Authors
        </h4>
        {content}
      </div>
    </>
  );
}
