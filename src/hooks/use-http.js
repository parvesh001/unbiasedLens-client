const useHttp = () => {
  const sendRequest = async ({ endpoint, method, body, headers }) => {
    const response = await fetch(`http://localhost:8080/api/v1/${endpoint}`, {
      method: method || "GET",
      body: JSON.stringify(body) || null,
      headers: headers || {},
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    const data = await response.json();
    return data;
  };

  return {
    sendRequest,
  };
};

export default useHttp;
