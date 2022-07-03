import {
  Tabs,
  Avatar,
  List,
  Button,
  Menu,
  MenuProps,
  Col,
  Row,
  Tree,
  Divider,
  Space,
  Select,
  Spin,
} from "antd";
import type { DataNode, DirectoryTreeProps } from "antd/lib/tree";
const { TabPane } = Tabs;
import React, { useEffect, useMemo, useState } from "react";

import Input from "antd/es/input/Input";
import {
  ContainerOutlined,
  DesktopOutlined,
  ExportOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useMount } from "ahooks";
import { CollectionService } from "../../services/CollectionService";
import { useBaseStore } from "../../store";
import { arrToTree, treeToAntdTreeData } from "../../helpers/collection/util";
import CollectionTitleRender from "./CollectionTitleRender";
const { Option } = Select;
import "./index.less";
const Collection = () => {
  const [treeLoading, setTressLoading] = useState(false);

  const collections = useBaseStore((state) => state.collections);
  const setCollections = useBaseStore((state) => state.setCollections);

  // 实现computed的功能
  const collectionTreeData = useMemo(
    () => {
      return treeToAntdTreeData(arrToTree(collections));
    },
    [collections],
  ); // 监听name和food这两个变量

  useEffect(
    () => {
      console.log(collectionTreeData, "collectionTreeData");
    },
    [collectionTreeData],
  );

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    const newActiveKey = keys[0];
    // console.log({ newActiveKey });
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {};

  const [treeData, setTreeData] = useState([]);

  function fetchDirectorytreeData() {
    setTressLoading(true);
    CollectionService.directorytree({}).then((res) => {
      setCollections(res);
      setTressLoading(false);
    },);
  }

  useMount(() => {
    fetchDirectorytreeData();
  },);
  return <div className={'collection'}>
    <div className={'right'}>
      <div style={{padding:'12px'}}>
        <Input placeholder={'搜索'} />
      </div>

      <Tabs defaultActiveKey="2" onChange={()=>{}} tabBarStyle={{padding:'0 12px'}}>
        <TabPane tab="我的集合" key="2">

        </TabPane >
        <TabPane tab="团队集合" key="1">

        </TabPane>
      </Tabs>

      {/*<div>{JSON.stringify(collections)}</div>*/}
      <div style={{padding:'0 12px'}}>
        <Select defaultValue="lucy" style={{ width: '100%' }} onChange={()=>{}}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </div>

      <Divider style={{margin:'12px 0'}}/>
      <Space style={{display:'flex',justifyContent:'space-between',padding:'0 12px'}}>
        <a onClick={()=>{
          // 1.调用创建集合接口
          CollectionService.createDirectorytree({
            type:3,
            name:'New Collection'
          }).then(res=>{
            console.log(res)
            // 2.更新树
            fetchDirectorytreeData()

          })
        }}>+新增</a>
        <Space>
          <a>
            <QuestionCircleOutlined style={{textAlign:'right'}} />
          </a>
          <a>
            <ExportOutlined style={{textAlign:'right'}}/>
          </a>


        </Space>

      </Space>
      <Divider style={{margin:'12px 0'}}/>
      <Spin spinning={treeLoading}>
        <Tree
            titleRender={ (val)=><CollectionTitleRender updateDirectorytreeData={fetchDirectorytreeData} val={val}></CollectionTitleRender> }
            style={{padding:'0 12px',display:'block'}}
            showLine={true}
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={collectionTreeData}
        />
      </Spin>

    </div>
  </div>;
};

export default Collection;
