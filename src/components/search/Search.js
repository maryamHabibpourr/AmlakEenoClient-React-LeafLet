import React from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <BiSearch size={22} className={styles.icon} />

      <input
        type="text"
        placeholder="جستجو با نام"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;