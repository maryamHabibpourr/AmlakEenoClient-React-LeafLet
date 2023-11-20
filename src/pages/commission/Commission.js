import React, { useState, useEffect, useRef } from 'react'


//style
import styles from "./Commission.module.scss"

//assets video
import building from "../../assets/building.mp4"




function Commission() {

  const vidRef = useRef();



  useEffect(() => {
    vidRef.current.play()
  }, [])




  return (
    <div className={styles.CommissionPage}>
      <div className={styles.CommissionContainer}>
        <div className={styles.videoContainer}>
          <video
            ref={vidRef}
            src={building}
            type="video/mp4"
            loop
            controls={false}
            muted
          />
          <div className={styles.appVideoOverlay}>
            <div className={styles.appVideoOverlayCircle}>
               <h1>کمیسیون در ایران</h1>
            </div>
          </div>
        </div>

        <div className={styles.contentOntactus}>
          <h4>شرایط کمیسیون در ایران</h4>
            <p>در ایران، کمیسیون معاملات املاک معمولاً به صورت درصدی از ارزش کل معامله محاسبه می‌شود. درصد مشخصی که ممکن است متغیر باشد، بسته به عواملی نظیر مکان، نوع ملک و مذاکرات بین طرفین معامله است. در ادامه به نکات کلیدی مرتبط با این موضوع اشاره می‌شود:</p>
            <p><span>درصد از ارزش کل معامله:</span>روش معمول برای محاسبه کمیسیون معاملات املاک در ایران، گرفتن یک درصد از کل قیمت فروش یا اجاره ملک است. این درصد ممکن است متغیر باشد، اما معمولاً توسط فروشنده یا مالک و دلال املاک قبل از امضای قرارداد قابل مذاکره است.</p>
            <p><span>مذاکره:</span> کمیسیون معاملات املاک توسط قوانین مشخص نمی‌شود و مورد مذاکره قرار می‌گیرد. فروشنده یا مالک ملک ممکن است نرخ کمیسیون را با دلال املاک قبل از امضای قرارداد مذاکره کنند. این مذاکره می‌تواند به عوامل مختلفی نظیر ارزش ملک، شرایط بازار و خدمات ارائه شده توسط دلال املاک وابسته باشد.</p>
            <p><span>هزینه های اضافی:</span> علاوه بر کمیسیون، در معاملات املاک در ایران ممکن است هزینه‌های دیگری نظیر هزینه‌های حقوقی، مالیات‌ها و هزینه‌های ثبتی وجود داشته باشد. خریداران و فروشندگان باید از این هزینه‌های اضافی در هنگام برنامه‌ریزی معامله ملک آگاهی داشته باشند.</p>
            <p><span>مقررات محلی:</span>شهرها یا استان‌های مختلف در ایران ممکن است رویه‌ها و نرخ‌های معمول در مورد کمیسیون‌های املاک مختلفی داشته باشند. بنابراین مهم است که مقررات محلی و رویه‌های عمومی را در نظر داشته باشید.</p>
            <p><span>سیاست های دلالی املاک:</span> برخی از دفاتر دلالی املاک ممکن است سیاست‌های خود را در مورد نرخ کمیسیون و نحوه محاسبه آن داشته باشند. پیشنهاد می‌شود که با دفتر معاملات ملکی خاصی که با آن کار می‌کنید، در مورد این جزئیات بیشتر مذاکره کنید.</p>
            <p><span>مستندات:</span>اطمینان حاصل کنید که توافق کمیسیون بین طرفین (فروشنده/مالک و دلال املاک) در یک قرارداد نوشتاری ثبت شده باشد. این قرارداد باید نرخ کمیسیون، شرایط پرداخت و هر شرایط و جزئیات مرتبط دیگر را به وضوح مشخص کند.</p>
            <p>به عنوان خلاصه، برای خریداران و فروشندگان مهم است که در معاملات ملکی خود از نحوه محاسبه و مذاکره کمیسیون به خوبی آگاهی پیدا کنند. از آنجایی که رویه‌ها ممکن است متغیر باشند، توصیه می‌شود که با دلال املاک محلی یا مشاور حقوقی مشورت کنید که در مورد مقررات کنونی و رویه‌های رایج در منطقه‌ای که معامله ملک در آن انجام می‌شود، اطلاعات دقیقی دارند.</p>
        </div>
      </div>
    </div>
  )
}

export default Commission