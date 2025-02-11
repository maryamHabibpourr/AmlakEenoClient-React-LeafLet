import React from "react";
import styles from "./Footer.module.scss";

//components
import SliderBrand from "../slider/SliderBrand";
import  CollapseModel from "../collapse/CollapseModel"
//date
import moment from 'jalali-moment';
//persian tools
import { convertDigits } from "persian-helpers";


const year = moment().locale('fa').format('YYYY').toString();

function Footer() {
  return (
    <div>
      <CollapseModel/>
      <SliderBrand/>
      <div></div>
      <div className={styles.footer}>&copy;{convertDigits(year)} تمامی حقوق برای املاک اینو محفوظ است.</div>
      <div className={styles.developer}>
        ساخته شده توسط{' '}
        <a
          href="https://maryyam.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: "bold", color:"red" }}>M</span>
        </a>
      </div>
    </div>
  )
}

export default Footer