import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: <a onClick={() => {}}>添加一个新的</a>,
      },
    ]}
  />
);
const CollectionTitleRender = ({data}) => {
    // console.log(data,'data')
  return (
    <div className={'collection-title-render'}>
      <div className={'left'}>
        <div className='content'>{data.name}{data.type}</div>
      </div>
      <div className='right'>
        <Dropdown overlay={menu} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>iii</Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default CollectionTitleRender;
