import { Avatar, Button, Dropdown, Menu, Space } from 'antd';
import AppGitHubStarButton from './GitHubStarButton';
import { DownOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import Setting from '../setting';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import SmartButton from '../smart/Button';
import HoverWrapper from '../smart/HoverWrapper';
import { css } from '@emotion/react';
type Props = {
  userinfo: any;
  workspaces: any[];
};

const RequesterHeader = styled.div`
  padding: 7px;
  display: flex;
  justify-content: space-between;
`;

const RequesterHeaderSectionLeft = styled.div`
  display: flex;
  align-items: center;
`;
const RequesterHeaderSectionRight = styled.div`
  display: flex;
  align-items: center;
`;
const TopNavigationButtons = styled.div`
  display: flex;
  align-items: center;
`;
const TopNavigationButton = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 6px;
`;
const DownOutlinedCx = styled(DownOutlined)`
  font-size: 10px;
`;
const AppHeader: FC<Props> = ({ userinfo, workspaces }) => {
  const _useNavigate = useNavigate();
  const [isSettingModalVisible, setIsSettingModalVisible] = useState(false);
  const SettingMenuItems = [
    {
      key: '1',
      label: <a onClick={() => {}}>Setting</a>,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: <a onClick={() => {}}>Privacy Policy</a>,
    },
    {
      key: '3',
      label: <a onClick={() => {}}>Terms</a>,
    },
  ];
  return (
    <>
      <RequesterHeader>
        <RequesterHeaderSectionLeft>
          <TopNavigationButtons>
            <TopNavigationButton>
              <HoverWrapper
                css={css`
                  padding: 0 6px;
                `}
              >
                <SmartButton>AREX</SmartButton>
              </HoverWrapper>
            </TopNavigationButton>

            <TopNavigationButton>
              <HoverWrapper
                css={css`
                  padding: 0 6px;
                `}
              >
                <Dropdown
                  overlay={
                    <Menu
                      items={workspaces.map((workspace) => {
                        return {
                          key: workspace.id,
                          label: (
                            <SmartButton
                              onClick={() => {
                                window.location.href = `/${workspace.id}/workspace/${workspace.workspaceName}`;
                              }}
                            >
                              {workspace.workspaceName}
                            </SmartButton>
                          ),
                        };
                      })}
                    />
                  }
                >
                  <SmartButton onClick={(e) => e.preventDefault()}>
                    <Space>
                      Workspaces
                      <DownOutlinedCx />
                    </Space>
                  </SmartButton>
                </Dropdown>
              </HoverWrapper>
            </TopNavigationButton>
            <TopNavigationButton>
              <AppGitHubStarButton />
            </TopNavigationButton>
          </TopNavigationButtons>
        </RequesterHeaderSectionLeft>
        <RequesterHeaderSectionRight>
          <Button style={{ marginRight: '8px' }} type={'primary'} icon={<UserAddOutlined />}>
            Invite
          </Button>

          <HoverWrapper
            css={css`
              padding: 0 6px;
              width: 32px;
              .anticon {
                display: block;
              }
            `}
          >
            <Dropdown trigger={['click']} overlay={<Menu items={SettingMenuItems} />}>
              <div>
                <SettingOutlined style={{ color: '#6B6B6B', fontSize: '16px' }} />
              </div>
            </Dropdown>
          </HoverWrapper>
          <HoverWrapper
            css={css`
              padding: 0 6px;
              width: 32px;
              .ant-avatar {
                display: block;
              }
            `}
          >
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu
                  items={[
                    {
                      key: 'Sign Out',
                      label: (
                        <a
                          onClick={() => {
                            localStorage.removeItem('email');
                            // value.dispatch({ type: "login"})
                            // _useNavigate('/')
                            window.location.href = '/';
                          }}
                        >
                          Sign Out
                        </a>
                      ),
                    },
                  ]}
                />
              }
            >
              <span onClick={(e) => e.preventDefault()}>
                <div>
                  <Avatar size={20}>{userinfo.email[0]}</Avatar>
                </div>
              </span>
            </Dropdown>
          </HoverWrapper>
        </RequesterHeaderSectionRight>
      </RequesterHeader>
      {/*模态框*/}
      <Setting isModalVisible={isSettingModalVisible} setModalVisible={setIsSettingModalVisible} />
    </>
  );
};

export default AppHeader;
