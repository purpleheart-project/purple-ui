import { Outlet } from 'react-router-dom';
import { FC, useContext, useRef, useState } from 'react';
import { GlobalContext } from '../App';
import { Button, Divider, Dropdown, Menu, Select, Space, Tabs } from 'antd';
import AppHeader from '../components/app/Header';
import './../components/app/index.less';
import './../components/collection/index.less';
import {
  AppleOutlined,
  DownOutlined,
  FileOutlined,
  GlobalOutlined,
  GoldOutlined,
} from '@ant-design/icons';
import DraggableLayout from './DraggableLayout';
import Environment from '../components/environment';
import Collection from '../components/collection';
import RequestPage from '../pages/collection/Request';
import FolderPage from '../pages/collection/Folder';
import ExamplePage from '../pages/collection/Example';
import { treeFind } from '../helpers/collection/util';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
const { TabPane } = Tabs;

const RequesterLeftSidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const RequesterSidebarHorizontalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;
const RequesterSidebarHorizontalHeaderLeftContainer = styled.div`
  .anticon {
    margin-right: 4px;
  }
`;
const RequesterSidebarHorizontalHeaderRightContainer = styled.div`
  padding: 6.5px;
`;
const RequesterLeftSidebarContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
`;
const RequesterLeftSidebarHeader = styled(Tabs)`
  width: 100%;
`;
const RequesterLeftSidebar = styled.div`
  flex: 1;
  overflow: hidden;
`;

const RequesterBuilder = styled.div`
  .ant-tabs-nav-list {
    .ant-tabs-tab {
      border-top: none !important;
      border-radius: 0 !important;
      background-color: white !important;
      border-left: none;
      border-bottom: 1px solid #eee !important;
      margin-left: 0!important;
      transition: none !important;
    }
    .ant-tabs-tab-active {
      border-bottom: 1px solid white !important;
    }
    .ant-tabs-nav-add {
      background-color: white;
      border: none;
      border-bottom: 1px solid #eee !important;
    }
  }
  .ant-tabs-nav {
    height: 38px;
  }
`;

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
            1st menu item
          </a>
        ),
      },
    ]}
  />
);

const MainBox = () => {
  const value = useContext(GlobalContext);
  console.log(value.state.isLogin, 'value');
  // *************侧边栏**************************
  // mainbox只管理这一个状态，其他都交给集合、环境这些组件内管理状态
  const [pages, setPages] = useState([{
    type:'requestPage',
    key:'1',
    title:'123',
    areaType:'requestPage'
  }]);
  function activateKeyOfpages(keys) {
    const collectionTreeData = childRef.current.changeVal();
    const treeFindItem = treeFind(collectionTreeData, (node) => node.key === keys[0]);
    setPages([
      ...pages,
      {
        areaType: treeFindItem.type === 3 ? 'folderPage' : 'requestPage',
        key: String(Math.random()),
      },
    ]);
  }

  const childRef = useRef();
  const updateChildState = (keys) => {};
  return (
    <div>
      <AppHeader userinfo={{ email: 'tzhangm' }} workspaces={[]} />
      <Divider style={{ margin: '0' }} />
      <DraggableLayout
        css={css`
          height: calc(100vh - 55px);
        `}
        firstNode={
          <RequesterLeftSidebarWrapper>
            <RequesterSidebarHorizontalHeader>
              <RequesterSidebarHorizontalHeaderLeftContainer>
                <GlobalOutlined />
                <span>Canyon</span>
              </RequesterSidebarHorizontalHeaderLeftContainer>
              <RequesterSidebarHorizontalHeaderRightContainer>
                <Button size={'small'} onClick={updateChildState}>
                  Import
                </Button>
              </RequesterSidebarHorizontalHeaderRightContainer>
            </RequesterSidebarHorizontalHeader>
            <Divider style={{ margin: '0' }} />
            <RequesterLeftSidebarContainer>
              {/*<RequesterLeftSidebarHeader />*/}
              <RequesterLeftSidebarHeader tabPosition={'left'}>
                <TabPane tab='Collections' key='1'>
                  <Collection
                    cRef={childRef}
                    activateKeyOfOperatingAreaInMainbox={(keys) => {
                      activateKeyOfpages(keys);
                    }}
                  />
                </TabPane>
                <TabPane tab='Environments' key='2'>
                  <Environment />
                </TabPane>
              </RequesterLeftSidebarHeader>
            </RequesterLeftSidebarContainer>
          </RequesterLeftSidebarWrapper>
        }
        secondNode={
          <RequesterBuilder className={'sssss'}>
            <Tabs
              animated={false}
              type='editable-card'
              tabBarExtraContent={
                <div style={{ padding: '8px 20px', borderLeft: '1px solid #eee' }}>
                  <Dropdown overlay={menu}>
                    <span>
                      <Space>
                        No Environment
                        <DownOutlined />
                      </Space>
                    </span>
                  </Dropdown>
                </div>
              }
            >
              {pages.map((page) => {
                return (
                  <TabPane key={page.key} closable={page.closable}>
                    {(() => {
                      console.log(page,'pp')
                      switch (page.areaType) {
                        case 'requestPage':
                          console.log(123)
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
          </RequesterBuilder>
        }
        direction={'horizontal'}
        limitRange={[15, 40]}
        lineWidth={10}
      />
    </div>
  );
};

export default MainBox;
