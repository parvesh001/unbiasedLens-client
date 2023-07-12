import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminPortalLinks() {
  const navigate = useNavigate();
  return (
    <>
      <li className="nav-item">
        <motion.button
          className="btn btn-primary mx-md-2 mt-3 mt-md-0"
          onClick={() => navigate("/admin-portal/authors")}
          whileHover={{ scale: 1.1, y: -3 , boxShadow:'0px 2px  10px rgba(0,0,0,.4)'}}
          transition={{type:'spring', stiffness:200, duration:.2}}
        >
          Authors
        </motion.button>
      </li>

      <li className="nav-item">
        <motion.button
          className="btn btn-primary mx-md-2 mt-3 mt-md-0"
          onClick={() => navigate("/admin-portal/categories")}
          whileHover={{ scale: 1.1, y: -3 , boxShadow:'0px 2px  10px rgba(0,0,0,.4)'}}
          transition={{type:'spring', stiffness:200, duration:.2}}
        >
          Categories
        </motion.button>
      </li>
      <li className="nav-item">
        <motion.button
          className="btn btn-primary mx-md-2 mt-3 mt-md-0"
          onClick={() => navigate("/admin-portal/add-category")}
          whileHover={{ scale: 1.1, y: -3 , boxShadow:'0px 2px  10px rgba(0,0,0,.4)'}}
          transition={{type:'spring', stiffness:200, duration:.2}}
        >
          Add Category
        </motion.button>
      </li>
    </>
  );
}
