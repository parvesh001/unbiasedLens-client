import React, { useEffect, useState } from "react";

import useHttp from "../../../hooks/use-http";
import CreateBlogForm from "./CreateBlogForm";

export default function CreateBlog() {
  const { sendRequest: fetchBlogCategories } = useHttp();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const blogCategories = categories.map((category) => {
    return (
      <option key={category._id} value={category.name}>
        {category.name}
      </option>
    );
  });

  useEffect(() => {
    (async function () {
      try {
        const response = await fetchBlogCategories({ endpoint: 'category' });
        const availableCategories = [...response.data.categories];
        setCategories(availableCategories);
      } catch (err) {
        setError(err.message)
      }
    })();
  }, [fetchBlogCategories]);

  if(error) return <p>{error}</p>

  return <CreateBlogForm blogCategories={blogCategories} />;
}
