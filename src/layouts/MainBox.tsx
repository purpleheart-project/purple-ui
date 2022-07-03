import React, { useState } from "react";
import { useMount } from "ahooks";
import { Divider, Menu, MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { ApiOutlined, SettingOutlined } from "@ant-design/icons";
import AppHeader from "../components/app/Header";
import "./MainBox.less";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem("常规", "rest", <ApiOutlined />),
  getItem("设置", "setting", <SettingOutlined />),
];

const MainBox = () => {
  const to = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => to(`/${e.key}`);
  const [mainBodyHeight, setMainBodyHeight] = useState(0);
  useMount(() => {
    // @ts-ignore
    const s = document.querySelector(".app-header").offsetHeight;
    // 加上padding
    setMainBodyHeight(s + 1);
  },);
  return <div className={'main-box'}>
    <AppHeader />
    <Divider style={{margin:'0'}}/>
    <div className={'main-body'} style={{height:`calc(100vh - ${mainBodyHeight}px)`}}>
      <Menu
          inlineCollapsed={true}
        activeKey="normal"
        mode="inline"
        items={items}
        onClick={onClick}
      />
      <div className={'page-view'}>
        <Outlet/>
      </div>
    </div>
  </div>;
};

export default MainBox;
