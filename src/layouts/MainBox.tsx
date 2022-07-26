import { Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';
import { GlobalContext } from '../App';
import { Button, Divider, Menu, Space, Tabs } from 'antd';
import AppHeader from '../components/app/Header';
import './../components/app/index.less';
import { FileOutlined, GlobalOutlined, GoldOutlined } from '@ant-design/icons';
import DraggableLayout from './DraggableLayout';
import Environment from '../components/environment';



const menuItems = [
  {
    key: "collection",
    label: "Collection",
    icon: <GlobalOutlined />,
    disabled: false,
  },
  {
    key: "replay",
    label: "Replay",
    icon: <FileOutlined />,
    disabled: false,
  },
  {
    key: "environment",
    label: "Environment",
    icon: <GoldOutlined />,
    disabled: true,
  },
];


const MainBox = () => {
  const value = useContext(GlobalContext);
  console.log(value.state.isLogin, 'value');
  // *************侧边栏**************************
  const [siderMenuSelectedKey, setSiderMenuSelectedKey] =
    useState("collection");
  return (
    <div>
      <AppHeader userinfo={{ email: 'tzhangm' }} workspaces={[]} />
      <DraggableLayout dir={"horizontal"}>
        {/*侧边栏*/}
        <div style={{ backgroundColor: "white" }}>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <div>
              <GlobalOutlined style={{ marginRight: "8px" }} />
            </div>
            <Space>
            </Space>
          </Space>
          <Divider style={{ margin: "0" }} />
          <div style={{ display: "flex" }} className={"tool-table"}>
            <Menu
              className={"left-menu"}
              mode="vertical"
              items={menuItems}
            />
            {/*flex布局需要overflow:'hidden'内部元素出滚动条*/}
            <div style={{ flex: "1", overflow: "hidden" }}>
              <div
                style={{
                  display:
                    siderMenuSelectedKey === "collection" ? "block" : "none",
                }}
              >
              </div>
              <div
                style={{
                  display:
                    siderMenuSelectedKey === "environment" ? "block" : "none",
                }}
              >
                <Environment />
              </div>
            </div>
          </div>
        </div>
        {/*主区域*/}
        <div style={{ padding: "10px" }}>
          <Tabs
            type="editable-card"
          >
          </Tabs>
        </div>
      </DraggableLayout>
    </div>
  );
};

export default MainBox;
