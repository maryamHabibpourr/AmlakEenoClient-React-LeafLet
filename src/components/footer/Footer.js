import React from "react";
import styles from "./Footer.module.scss";

//components
import SliderBrand from "../slider/SliderBrand";
import  CollapseModel from "../collapse/CollapseModel"
//date
import moment from 'jalali-moment';
//persian tools
import { digitsEnToFa } from "@persian-tools/persian-tools";


const year = moment().locale('fa').format('YYYY').toString();



function Footer() {
  return (
    <div>
      <CollapseModel/>
      <SliderBrand/>
      <div></div>
      <div className={styles.footer}>&copy;{digitsEnToFa(year)} تمامی حقوق برای املاک اینو محفوظ است.</div>
    </div>
  )
}

export default Footer