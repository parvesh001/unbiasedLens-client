import { useContext } from "react";
import CreateBlogForm from "./CreateBlogForm";
import { CategoryContext } from "../../../context/categoryContext";

export default function CreateBlog() {
  const {categories, error} = useContext(CategoryContext)
 
  const blogCategories = categories?.map((category) => {
    return (
      <option key={category._id} value={category.name}>
        {category.name}
      </option>
    );
  });

  if(error) return <p className="text-danger-emphasis fw-bold text-center fs-4">{error.message}</p>

  return <CreateBlogForm blogCategories={blogCategories} />;
}
