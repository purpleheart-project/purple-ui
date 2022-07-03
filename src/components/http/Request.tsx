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
import "./Request.less";

const RequestTypeOptions = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "DELETE", value: "DELETE" },
  { label: "PATCH", value: "PATCH" },
];

const HttpRequest: React.FC<any> = () => {
  return <div className={'http-request'}>
    <div className={'top'}>
      <Select value={'GET'} className={'select'} options={RequestTypeOptions}/>
      <Input className={'input'} style={{width:'100px'}}/>
      <Button>发送</Button>
    </div>
  </div>;
};

export default HttpRequest;
