import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles["not-found"]}>
      <div>
        <h2>404</h2>
        <p>صفحه یافت نشد</p>
        <button className="--btn">
          <Link to="/">&larr;</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;