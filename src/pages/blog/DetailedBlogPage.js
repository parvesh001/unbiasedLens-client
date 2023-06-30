import React from "react";
import DetailedBlog from "../../components/blog/detailedBlog/DetailedBlog";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import { useParams } from "react-router-dom";

export default function DetailedBlogPage() {
  const { blogId } = useParams();

  return (
    <div style={{ minHeight: "80vh" }}>
      <ErrorBoundary>
        <DetailedBlog blogId={blogId} />
      </ErrorBoundary>
    </div>
  );
}
