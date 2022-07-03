import { Badge, Dropdown, Menu, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CollectionService } from "../../services/CollectionService";

function CollectionTitleRender({ val, updateDirectorytreeData }: any) {
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };
  const menu = (val: any) => {
    return (
      <Menu
        onClick={
          (e) => {
            e.domEvent.stopPropagation();
            setVisible(false);
          }
        }
        items={[
          {
            key: "1",
            label: (
              <a
                                target="_blank"
                                onClick={() => {
                                    CollectionService.createDirectorytree({
                                        type:3,
                                        name:'test3',
                                        pid:val.id
                                    }).then(res=>{
                                        console.log(res)
                                        updateDirectorytreeData()
                                    })
                                }}
                            >
                                新增文件夹
                            </a>
            ),
            // 只有类型为3才能新增文件夹
            disabled: val.type !== 3,
          },
          {
            key: "2",
            label: (
              <a
                                target="_blank"
                                onClick={() => {
                                    CollectionService.createDirectorytree({
                                        type:1,
                                        name:'New Request',
                                        pid:val.id
                                    }).then(res=>{
                                        console.log(res)
                                        updateDirectorytreeData()
                                    })
                                }}
                            >
                                新增request
                            </a>
            ),
            disabled: val.type !== 3,
          },
          {
            key: "3",
            label: (
              <a
                                target="_blank"
                                onClick={() => {
                                    CollectionService.createDirectorytree({
                                        type:2,
                                        name:'New Request',
                                        pid:val.id
                                    }).then(res=>{
                                        console.log(res)
                                        updateDirectorytreeData()
                                    })
                                }}
                            >
                                新增eg
                            </a>
            ),
            disabled: val.type !== 1,
          },
          {
            key: "4",
            label: (
              <a
                                target="_blank"
                                onClick={() => {
                                }}
                            >
                                重命名
                            </a>
            ),
          },
          {
            key: "5",
            label: (
              <a
                                style={{color:'red'}}
                                target="_blank"
                                onClick={() => {
                                    CollectionService.deleteDirectorytree({id:val.id}).then(res=>{
                                        updateDirectorytreeData()
                                    })
                                }}
                            >
                                删除
                            </a>
            ),
          },
        ]}
      />
    );
  };
  return (
    <div className={"collection-title-render"}>
            <div className={"wrap"}>
                <div>
                    {
                        val.type === 1?<span style={{color:'#10B981',marginRight:'12px'}}>GET</span>:null
                    }
                    {val.name}
                </div>
                <Dropdown
                    overlay={menu(val)}
                    trigger={["click"]}
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                >
                    <span onClick={(event) => event.stopPropagation()}>
                      <Space>
                        <MoreOutlined size={100} style={{fontSize:'16px'}}/>
                      </Space>
                    </span>
                </Dropdown>
            </div>
        </div>
  );
}

export default CollectionTitleRender;
