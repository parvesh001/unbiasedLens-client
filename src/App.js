import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Layout from "./components/layout/Layout";
import CategoryBlogs from "./pages/blog/CategoryBlogs";
import Authentication from "./components/authentication/Authentication";

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/author-authentication"
          element={<Authentication/>}
        />
        <Route
          path="/blogs/category/:blogCategory"
          element={<CategoryBlogs />}
        />
        <Route
          path="/blogs/category/:blogCategory/:blogId"
          element={<p>This is single post</p>}
        />
        <Route
          path="/"
          element={<Navigate replace to="/blogs/category/technology" />}
        />
      </Routes>
      
    </Layout>
  );
}

export default App;
