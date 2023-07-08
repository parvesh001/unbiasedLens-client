import React, { useContext, useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import { AuthContext } from "../../../context/authContext";
import Loading from "../../loadingSpinner/Loading";

export default function AuthorsPortal() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const { sendRequest: fetchAuthors } = useHttp();

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

  
  if (isLoading) return <Loading />;
  if (error)
    return <p className="fs-4 text-center mt-5 text-light">{error.message}</p>;

  return <div>AuthorsPortal</div>;
}
