import {
  Breadcrumb,
  Button,
  Divider,
  Dropdown,
  Input,
  Menu,
  Select,
  Space,
  Tabs,
} from "antd";
import React, { useRef, useState } from "react";
// import AnimateAutoHeight from "../AnimateAutoHeight";
import {
  CodeOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  LinkOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import "./Request.less";

export type KeyValueType = {
  id: string;
  key: string;
  value: string;
  active: boolean;
};

const setRequestParams = () => {};

const { TabPane } = Tabs;

const initialPanes = [
  { title: "Tab 1", content: "Content of Tab 1", key: "1" },
  { title: "Tab 2", content: "Content of Tab 2", key: "2" },
  {
    title: "Tab 3",
    content: "Content of Tab 3",
    key: "3",
    closable: false,
  },
];

const RequestTypeOptions = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "DELETE", value: "DELETE" },
  { label: "PATCH", value: "PATCH" },
];

type ParamsType = {
  id: string;
  key: string;
  value: string | number;
  disabled: boolean;
};
const HttpRequest: React.FC<any> = () => {
  return <div className={'http-request'}>
    <div className={'top'}>

      <Select className={'select'} options={RequestTypeOptions}/>
      <Input className={'input'} style={{width:'100px'}}/>
      <Button>发送</Button>

    </div>
  </div>;
};

export default HttpRequest;
