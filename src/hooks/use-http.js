import React from "react";

const useHttp = () => {
  const sendRequest = React.useCallback(
    async ({ endpoint, method, body, headers }) => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/${endpoint}`, {
        method: method || "GET",
        body: body || null,
        headers: headers || {},
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error)
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
