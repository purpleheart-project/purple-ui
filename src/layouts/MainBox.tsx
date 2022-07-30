import { Outlet } from 'react-router-dom';
import { FC, useContext, useRef, useState } from 'react';
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
import { treeFind } from '../helpers/collection/util';
import styled from '@emotion/styled';
const { TabPane } = Tabs;

const RequesterLeftSidebarWrapper = styled.div``;
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
  padding: 10px;
`;
const RequesterLeftSidebarContainer = styled.div`
  display: flex;
  width: 100%;
`;
const RequesterLeftSidebarHeader = styled(Tabs)`
  width: 100%;
`;
const RequesterLeftSidebar = styled.div`
  flex: 1;
  overflow: hidden;
`;

const RequesterBuilder = styled.div``;

const MainBox = () => {
  const value = useContext(GlobalContext);
  console.log(value.state.isLogin, 'value');
  // *************侧边栏**************************
  // mainbox只管理这一个状态，其他都交给集合、环境这些组件内管理状态
  const [pages, setPages] = useState([]);
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
          <RequesterBuilder>
            <Tabs type='editable-card'>
              {pages.map((page) => {
                return (
                  <TabPane tab={'yi'} key={page.key} closable={page.closable}>
                    {(() => {
                      switch (page.areaType) {
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
          </RequesterBuilder>
        }
        direction={'horizontal'}
        limitRange={[15, 40]}
        lineWidth={100}
      />
    </div>
  );
};

export default MainBox;
