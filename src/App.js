import { Routes, Route } from "react-router-dom";
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
      </Routes>
    </Layout>
  );
}

export default App;
