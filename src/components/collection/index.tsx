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
    console.log('onSelect', info, selectedKeysValue);
    if (selectedKeysValue.length > 0) {
      setSelectedKeys(selectedKeysValue);
    }
  };

  return (
    <div className={'collection'}>
      <Tree
          blockNode={true}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
        titleRender={()=><CollectionTitleRender/>}
      />
      <Button>添加一个并展开</Button>
    </div>
  );
};

export default Collection;
