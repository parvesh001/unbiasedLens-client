import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CategoryBlogsPage from "./pages/blog/CategoryBlogsPage";
import AuthenticationPage from "./pages/authentication/AuthenticationPage";
import DetailedBlogPage from "./pages/blog/DetailedBlogPage";
import CreateBlogPage from "./pages/blog/CreateBlogPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AuthorBlogsPage from "./pages/blog/AuthorBlogsPage";
import UploadProfilePage from "./pages/profile/UploadProfilePage";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import AdminAuthorsPortalPage from "./pages/admin/AdminAuthorsPortalPage";

function App() {
  const { author } = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/author-authentication" element={<AuthenticationPage />} />
        <Route
          path="/blogs/category/:blogCategory"
          element={<CategoryBlogsPage />}
        />
        <Route
          path="/blogs/category/:blogCategory/:blogId"
          element={<DetailedBlogPage />}
        />
        <Route path="/blogs/create-blog" element={<CreateBlogPage />} />
        <Route path="/author/:name/:id" element={<ProfilePage />} />
        <Route path="/author/:name/:id/blogs" element={<AuthorBlogsPage />} />
        <Route
          path="/author/:name/:id/upload-profile"
          element={<UploadProfilePage />}
        />
        <Route
          path="/"
          element={<Navigate replace to="/blogs/category/technology" />}
        />
        <Route
          path="*"
          element={<Navigate replace to="/blogs/category/technology" />}
        />

        {author && author.role === "admin" && (
          <Route
            path="/admin-portal/authors"
            element={<AdminAuthorsPortalPage/>}
          />
        )}
        {author && author.role === "admin" && (
          <Route
            path="/admin-portal/categories"
            element={<p>This is admin portal</p>}
          />
        )}
        {author && author.role === "admin" && (
          <Route
            path="/admin-portal/add-category"
            element={<p>This is admin portal</p>}
          />
        )}
      </Routes>
    </Layout>
  );
}

export default App;
