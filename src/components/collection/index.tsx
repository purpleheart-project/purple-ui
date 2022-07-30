import { DownOutlined } from '@ant-design/icons';
import { Button, Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import CollectionTitleRender from './CollectionTitleRender';
import { useMount } from 'react-use';
import { CollectionService } from '../../services/CollectionService';
import {useEffect, useImperativeHandle, useState} from 'react';
import { arrToTree } from '../../helpers/collection/util';

const Collection = ({activateKeyOfOperatingAreaInMainbox,cRef}) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [treeData, setTreeData] = useState([]);

  // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    changeVal: () => {
      return treeData
    },
  }));

  useMount(() => {
    console.log('怪哉一边')
    CollectionService.listCollections().then((res) => {
      // 关键遍历的地方
      function bianli(arr) {
        return arr.map((item) => {
          if (item.children && item.children.length > 0) {
            return {
              key: String(item.id),
              title: item.name + item.id,
              isLeaf: item.type !== 3,
              ...item,
              children: bianli(item.children),
            };
          } else {
            return {
              key: String(item.id),
              title: item.name + item.id,
              isLeaf: item.type !== 3,
              ...item,
            };
          }
        });
      }

      setTreeData(bianli(arrToTree(res.data)));
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
    // console.log('onSelect', info, selectedKeysValue);
    if (selectedKeysValue.length > 0) {
      setSelectedKeys(selectedKeysValue);
    }

    // 激活mainbox里操作台的key

    activateKeyOfOperatingAreaInMainbox(selectedKeysValue)

  };

  return (
    <div className={'collection'}>
      <Tree
        blockNode={true}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
        titleRender={(data) => <CollectionTitleRender data={data} />}
        key={'id'}
      />
      <Button>添加一个并展开</Button>
    </div>
  );
};

export default Collection;
