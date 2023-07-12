import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CategoryBlogsPage from "./pages/blog/CategoryBlogsPage";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Loading from "./components/loadingSpinner/Loading";
import { CategoryContext } from "./context/categoryContext";

const AuthenticationPage = React.lazy(() =>
  import("./pages/authentication/AuthenticationPage")
);
const AdminAuthorsPortalPage = React.lazy(() =>
  import("./pages/admin/AdminAuthorsPortalPage")
);
const AdminCatrgoriesPortalPage = React.lazy(() =>
  import("./pages/admin/AdminCatrgoriesPortalPage")
);
const AdminAddCategoryPortalPage = React.lazy(() =>
  import("./pages/admin/AdminAddCategoryPortalPage")
);
const UploadProfilePage = React.lazy(() =>
  import("./pages/profile/UploadProfilePage")
);
const AuthorBlogsPage = React.lazy(() =>
  import("./pages/blog/AuthorBlogsPage")
);
const ProfilePage = React.lazy(() => import("./pages/profile/ProfilePage"));
const CreateBlogPage = React.lazy(() => import("./pages/blog/CreateBlogPage"));
const DetailedBlogPage = React.lazy(() =>
  import("./pages/blog/DetailedBlogPage")
);

function App() {
  const { author, isLogedIn } = useContext(AuthContext);
  const { categories, isLoading, error } = useContext(CategoryContext);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-danger-emphasis fw-bold text-center fs-4">
        {error.message}
      </p>
    );
  return (
    <Layout>
      <Suspense
        fallback={
          <div style={{ minHeight: "86vh" }}>
            <Loading />
          </div>
        }
      >
        <Routes>
          <Route
            path="/author-authentication"
            element={<AuthenticationPage />}
          />
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
          {isLogedIn && (
            <Route
              path="/author/:name/:id/upload-profile"
              element={<UploadProfilePage />}
            />
          )}
          <Route
            path="/"
            element={
              <Navigate replace to={`/blogs/category/${categories[0].slug}`} />
            }
          />
          <Route
            path="*"
            element={
              <Navigate replace to={`/blogs/category/${categories[0].slug}`} />
            }
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
      </Suspense>
    </Layout>
  );
}

export default App;
