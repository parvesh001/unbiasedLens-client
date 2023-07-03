import React, { useEffect, useState } from "react";

import useHttp from "../../../hooks/use-http";
import CreateBlogForm from "./CreateBlogForm";

export default function CreateBlog() {
  const { sendRequest: fetchBlogCategories } = useHttp();
  const [categories, setCategories] = useState([]);
  const blogCategories = categories.map((category) => {
    return (
      <option key={category._id} value={category.name}>
        {category.name}
      </option>
    );
  });

  useEffect(() => {
    (async function () {
      const response = await fetchBlogCategories({ endpoint: "category" });
      const availableCategories = [...response.categories];
      setCategories(availableCategories);
    })();
  }, [fetchBlogCategories]);

  return <CreateBlogForm blogCategories={blogCategories} />;
}
