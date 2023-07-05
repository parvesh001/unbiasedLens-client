import React from "react";
import DetailedBlog from "../../components/blog/detailedBlog/DetailedBlog";
import { useParams } from "react-router-dom";

export default function DetailedBlogPage() {
  const { blogId } = useParams();

  return (
    <div style={{ minHeight: "86vh" }}>
      <DetailedBlog blogId={blogId} />
    </div>
  );
}
