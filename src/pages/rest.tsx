import { Badge, Tabs, TabsProps } from "antd";

import Collection from "../components/collection";
import React, { useRef, useState } from "react";
import DraggableLayout from "../layouts/DraggableLayout";
import { useMount } from "ahooks";
const { TabPane } = Tabs;
import HttpRequest from "../components/http/Request";
import {useBaseStore} from "../store";
// import { useHttpStore } from "../store/http";

const Rest = () => {
  const httpPanes = useBaseStore(state=>state.httpPanes)
  const httpActiveKey = useBaseStore(state=>state.httpActiveKey)
  // const [requests,setRequests] = useState([])

  const [workAreas, setWorkAreas] = useState<any>([]);

  useMount(() => {
    setWorkAreas([
      {
        endpoint: "123",
        closable: true,
        title: "1",
        key: "1",
      },
      {
        endpoint: "321",
        closable: true,
        title: "2",
        key: "2",
      },
    ],);
  },);

  // const httpPanes = useHttpStore((state) => state.httpPanes);
  // const httpActiveKey = useHttpStore((state) => state.httpActiveKey);
  // const setHttpActiveKey = useHttpStore((state) => state.setHttpActiveKey);
  // const setHttpPanes = useHttpStore((state) => state.setHttpPanes);

  // const test = useRef(null);
  return (
    <DraggableLayout dir={'horizontal'}>


        {/*<http workAreas={workAreas}/>*/}



<div>
  <Tabs type="editable-card"  activeKey={httpActiveKey}>
    {
      httpPanes.map(httpPane=>{
        return <TabPane tab={httpPane.title} key={httpPane.key} closable={httpPane.closable} style={{height:'500px'}}>
          asfas
        </TabPane>
      })
    }

  </Tabs>


  <HttpRequest/>
  <Tabs defaultActiveKey="1" style={{height:'100%'}} onChange={()=>{}}>
    <TabPane   style={{paddingLeft:'0px'}} tab="集合" key="1">
      <Collection />
    </TabPane>
    <TabPane tab="历史记录" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
</div>
        {/*<Tabs type="editable-card" >*/}

        {/*</Tabs>*/}





        <div style={{height:'100%'}}>
          <Tabs defaultActiveKey="1" style={{height:'100%'}} onChange={()=>{}} tabPosition={'left'}>
            <TabPane   style={{paddingLeft:'0px'}} tab="集合" key="1">
              <Collection />
            </TabPane>
            <TabPane tab="历史记录" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>


      </DraggableLayout>
  );
};

export default Rest;
