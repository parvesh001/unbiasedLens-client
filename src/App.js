import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Layout from "./components/layout/Layout";
import CategoryBlogs from "./pages/blog/CategoryBlogs";

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/blogs/category/:blogCategory"
          element={<CategoryBlogs />}
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
