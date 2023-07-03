import React from "react";

const useHttp = () => {
  const sendRequest = React.useCallback(
    async ({ endpoint, method, body, headers }) => {
      const response = await fetch(`http://127.0.0.1:8080/api/v1/${endpoint}`, {
        method: method || "GET",
        body: body || null,
        headers: headers || {},
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },
    []
  );

  return {
    sendRequest,
  };
};

export default useHttp;
