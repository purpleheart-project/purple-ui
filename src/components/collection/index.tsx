import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import CollectionTitleRender from './CollectionTitleRender';
import {useMount} from "react-use";
import {CollectionService} from "../../services/CollectionService";

const Collection = () => {
  function onExpand() {}
  function onSelect() {}

  const treeData: DataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              disableCheckbox: true,
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        }
      ],
    },
  ];

  useMount(()=>{
    CollectionService.qcollection().then(res=>{
      console.log(res,'res')
    })
  })
  return (
    <div className={'collection'}>
      <Tree
        blockNode={true}
        onExpand={onExpand}
        onSelect={onSelect}
        switcherIcon={<DownOutlined />}
        treeData={treeData}
        titleRender={(val) => <CollectionTitleRender />}
      />
    </div>
  );
};

export default Collection;
