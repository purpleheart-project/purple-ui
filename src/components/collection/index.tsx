import { DownOutlined } from '@ant-design/icons';
import { Button, Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import CollectionTitleRender from './CollectionTitleRender';
import { useMount } from 'react-use';
import { CollectionService } from '../../services/CollectionService';
import { useEffect, useState } from 'react';

const Collection = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-2']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [treeData, setTreeData] = useState([]);

  useMount(() => {
    CollectionService.qcollection().then((res) => {
      setTreeData(res.data);
    });
  });

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <div>
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
      <Button
        onClick={() => {
          CollectionService.qcollection().then((res) => {
            setTreeData([
              {
                title: 'parent 1',
                key: '0-0',
                children: [
                  {
                    title: 'parent 1-0',
                    key: '0-0-0',
                    children: [
                      {
                        title: 'leaf1',
                        key: '0-0-0-0',
                      },
                      {
                        title: 'leaf2',
                        key: '0-0-0-1',
                      },
                    ],
                  },
                ],
              },
              {
                title: 'parent 2',
                key: '0-1',
                children: [
                  {
                    title: 'parent 1-1',
                    key: '0-1-0',
                  },
                ],
              },
            ]);
          });

          // 此处功能以后将要改造为新增请求时打开新的tab，并激活选中
          // postman效果是选中了以后无法取消需要做到

          setExpandedKeys([...expandedKeys,'0-1'])
        }}
      >
        添加一个并展开
      </Button>
    </div>
  );
};

export default Collection;
