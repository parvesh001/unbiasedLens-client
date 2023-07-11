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
import AdminCatrgoriesPortalPage from "./pages/admin/AdminCatrgoriesPortalPage";
import AdminAddCategoryPortalPage from "./pages/admin/AdminAddCategoryPortalPage";
import Loading from "./components/loadingSpinner/Loading";
import { CategoryContext } from "./context/categoryContext";

function App() {
  const { author, isLogedIn } = useContext(AuthContext);
  const {categories,isLoading, error} = useContext(CategoryContext)

  if(isLoading) return <Loading/>
  if(error) return <p className="text-danger-emphasis fw-bold text-center fs-4">{error.message}</p>
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
       {isLogedIn &&  <Route
          path="/author/:name/:id/upload-profile"
          element={<UploadProfilePage />}
        />}
        <Route
          path="/"
          element={<Navigate replace to={`/blogs/category/${categories[0].slug}`} />}
        />
        <Route
          path="*"
          element={<Navigate replace to={`/blogs/category/${categories[0].slug}`}  />}
        />

        {author && author.role === "admin" && (
          <Route
            path="/admin-portal/authors"
            element={<AdminAuthorsPortalPage />}
          />
        )}
        {author && author.role === "admin" && (
          <Route
            path="/admin-portal/categories"
            element={<AdminCatrgoriesPortalPage />}
          />
        )}
        {author && author.role === "admin" && (
          <Route
            path="/admin-portal/add-category"
            element={<AdminAddCategoryPortalPage />}
          />
        )}
      </Routes>
    </Layout>
  );
}

export default App;
