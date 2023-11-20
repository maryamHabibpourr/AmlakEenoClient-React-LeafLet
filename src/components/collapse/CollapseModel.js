import React from 'react';
import { Collapse } from 'antd';
import "./CollapseModel.scss"

const text = `ارائه مشاور تخصصی خرید ملک و زمین توسط تیم امکاک اینو`
const label1 = `خرید و اجاره ملک در تهران با املاک اینو`




const itemsNest = [
  {
    key: '1',
    label: <span style={{ fontSize: "15px", fontFamily: "YekanBakh", fontWeight: "700" }}>{label1}</span>,
    children: <p style={{ fontSize: "15px", fontFamily: "YekanBakh" , fontWeight: "500" }}>{text}</p>,
  },
];



const items = [
  {
    key: '1',
    label: '',
    children: <Collapse expandIconPosition="end" defaultActiveKey="1" items={itemsNest} />,
  },
  {
    key: '2',
    label: <span style={{ fontSize: "15px", fontFamily: "YekanBakh", fontWeight: "700" }}>سرمایه گذاری املاک اینو در ساخت ملک</span>,
    children: <p style={{ fontSize: "15px", fontFamily: "YekanBakh" , fontWeight: "500" }}> فرصتی برای سرمایه‌گذاری پایدار و رشد اقتصادی</p>,
  },
  {
    key: '3',
    label: <span style={{ fontSize: "15px", fontFamily: "YekanBakh", fontWeight: "700" }}>تلاش مشترک و گسترده</span>,
    children: <p style={{ fontSize: "15px", fontFamily: "YekanBakh" , fontWeight: "500" }}>همکاری گسترده با سایر آژانس‌های املاک برای بهبود خدمات مشتریان</p>,
  },
];




function CollapseModel() {

  return (
    <div className="CollapsePage">
      <div className="colapsContainer">
        <Collapse expandIconPosition="end" defaultActiveKey="1" accordion items={items} />
      </div>
    </div>
  )
}

export default CollapseModel