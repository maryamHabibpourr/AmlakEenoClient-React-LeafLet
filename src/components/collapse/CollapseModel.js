import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./CollapseModel.scss";

// داده‌های داینامیک برای آکاردئون
const accordionData = [
  {
    title: "خرید و اجاره ملک در تهران با املاک اینو",
    content: "ارائه مشاور تخصصی خرید ملک و زمین توسط تیم املاک اینو",
  },
  {
    title: "سرمایه‌گذاری املاک اینو در ساخت ملک",
    content: "فرصتی برای سرمایه‌گذاری پایدار و رشد اقتصادی",
  },
  {
    title: "نحوه دریافت وام مسکن",
    content:
      "برای دریافت وام مسکن، ابتدا باید مدارک لازم مانند فیش حقوقی، شناسنامه، و سند ملک را آماده کنید. سپس با مراجعه به بانک‌های طرف‌قرارداد، درخواست خود را ثبت نمایید.",
  },
  {
    title: "نکات مهم در انتخاب خانه مناسب",
    content:
      "۱. موقعیت جغرافیایی ملک را بررسی کنید.\n۲. به امکانات منطقه مانند دسترسی به حمل‌ونقل عمومی توجه کنید.\n۳. بودجه خود را از قبل تعیین کنید.\n۴. از مشاورین املاک معتبر کمک بگیرید.",
  },
];

function CollapseModel() {
  return (
    <div className="CollapsePage">
      <div className="colapsContainer">
        {accordionData.map((item, index) => (
          <Accordion key={index} defaultExpanded={index === 0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
            >
              <Typography
                style={{
                  fontSize: "15px",
                  fontFamily: "YekanBakh",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "YekanBakh",
                  fontWeight: "500",
                  textAlign: "right",
                  whiteSpace: "pre-line", // برای نمایش خطوط جدید در محتوا
                }}
              >
                {item.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default CollapseModel;