import { Outlet } from 'react-router-dom';
import {useContext, useRef, useState} from 'react';
import { GlobalContext } from '../App';
import { Button, Divider, Menu, Space, Tabs } from 'antd';
import AppHeader from '../components/app/Header';
import './../components/app/index.less';
import './../components/collection/index.less';
import { FileOutlined, GlobalOutlined, GoldOutlined } from '@ant-design/icons';
import DraggableLayout from './DraggableLayout';
import Environment from '../components/environment';
import Collection from '../components/collection';
import RequestPage from '../pages/collection/Request';
import FolderPage from '../pages/collection/Folder';
import ExamplePage from '../pages/collection/Example';
import {treeFind} from "../helpers/collection/util";
const { TabPane } = Tabs;
const menuItems = [
  {
    key: 'collection',
    label: 'Collection',
    icon: <GlobalOutlined />,
    disabled: false,
  },
  {
    key: 'replay',
    label: 'Replay',
    icon: <FileOutlined />,
    disabled: false,
  },
  {
    key: 'environment',
    label: 'Environment',
    icon: <GoldOutlined />,
    disabled: true,
  },
];

const MainBox = () => {
  const value = useContext(GlobalContext);
  console.log(value.state.isLogin, 'value');
  // *************侧边栏**************************
  const [siderMenuSelectedKey, setSiderMenuSelectedKey] = useState('collection');

  // mainbox只管理这一个状态，其他都交给集合、环境这些组件内管理状态
  const [operatingArea, setOperatingArea] = useState([
    // {
    //   areaType: 'requestPage',
    //   key:'1'
    // },
    // {
    //   areaType: 'examplePage',
    //   key:'2'
    // },
    // {
    //   areaType: 'folderPage',
    //   key:'3'
    // },
  ]);

  function activateKeyOfOperatingArea(keys) {
    console.log(keys, 'sss');

    const collectionTreeData = childRef.current.changeVal()

    console.log(treeFind(collectionTreeData,node=>node.key === keys[0]),123)

    const treeFindItem = treeFind(collectionTreeData,node=>node.key === keys[0])

    setOperatingArea([
      {
        areaType: treeFindItem.type === 3?'folderPage':'requestPage',
        key: keys[0],
      },
    ]);
  }

  const childRef = useRef();
  const updateChildState = (keys) => {
    // changeVal就是子组件暴露给父组件的方法
    // console.log(childRef.current.changeVal(),'childRef.current.changeVal()')
  };
  return (
    <div>
      <AppHeader userinfo={{ email: 'tzhangm' }} workspaces={[]} />
      <Divider style={{ margin: '0' }} />
      <DraggableLayout dir={'horizontal'} range={[15, 40]}>
        {/*侧边栏*/}
        <div style={{ backgroundColor: 'white' }}>
          <Space
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px',
            }}
          >
            <div>
              <GlobalOutlined style={{ marginRight: '8px' }} />
            </div>
            <Space>
              <Button onClick={updateChildState}>asfas</Button>
            </Space>
          </Space>
          <Divider style={{ margin: '0' }} />
          <div style={{ display: 'flex' }} className={'tool-table'}>
            <Menu className={'left-menu'} mode='vertical' items={menuItems} />
            {/*flex布局需要overflow:'hidden'内部元素出滚动条*/}
            <div style={{ flex: '1', overflow: 'hidden' }}>
              <div
                style={{
                  display: siderMenuSelectedKey === 'collection' ? 'block' : 'none',
                }}
              >
                <Collection
                    cRef={childRef}
                  activateKeyOfOperatingAreaInMainbox={(keys) => {
                    activateKeyOfOperatingArea(keys);
                  }}
                ></Collection>
              </div>
              <div
                style={{
                  display: siderMenuSelectedKey === 'environment' ? 'block' : 'none',
                }}
              >
                <Environment />
              </div>
            </div>
          </div>
        </div>
        {/*主区域*/}
        <div style={{ padding: '10px' }}>
          <Tabs type='editable-card'>
            {operatingArea.map((operatingAreaItem) => {
              return (
                <TabPane
                  tab={'yi'}
                  key={operatingAreaItem.key}
                  closable={operatingAreaItem.closable}
                >
                  {/*{*/}
                  {/*  (              if (operatingAreaItem.areaType === 'requestPage') {*/}
                  {/*  return <RequestPage />;*/}
                  {/*}*/}
                  {/*  if (operatingAreaItem.areaType === 'examplePage') {*/}
                  {/*  return <ExamplePage></ExamplePage>;*/}
                  {/*}*/}
                  {/*  if (operatingAreaItem.areaType === 'folderPage') {*/}
                  {/*  return <FolderPage></FolderPage>;*/}
                  {/*})*/}
                  {/*}*/}

                  {(() => {
                    switch (operatingAreaItem.areaType) {
                      case 'requestPage':
                        return <RequestPage />;
                      case 'examplePage':
                        return <ExamplePage />;
                      case 'folderPage':
                        return <FolderPage />;
                      default:
                        return null;
                    }
                  })()}
                </TabPane>
              );
            })}
          </Tabs>
        </div>
      </DraggableLayout>
    </div>
  );
};

export default MainBox;
