import { Tabs } from "antd";

import Collection from "../components/collection";
import DraggableLayout from "../layouts/DraggableLayout";

const { TabPane } = Tabs;
import HttpRequest from "../components/http/Request";
import { useBaseStore } from "../store";

const Rest = () => {
  const httpPanes = useBaseStore((state) => state.httpPanes);
  const httpActiveKey = useBaseStore((state) => state.httpActiveKey);
  return (
    <DraggableLayout dir={'horizontal'}>
            <div>
                <Tabs type="editable-card" activeKey={httpActiveKey}>
                    {
                        httpPanes.map((httpPane: any) => {
                            return <TabPane tab={httpPane.title} key={httpPane.key} closable={httpPane.closable}
                                            style={{height: '500px'}}>
                                asfas
                            </TabPane>
                        })
                    }

                </Tabs>


                <HttpRequest/>
                <Tabs defaultActiveKey="1" style={{height: '100%'}} onChange={() => {
                }}>
                    <TabPane style={{paddingLeft: '0px'}} tab="请求头" key="1">
                        {/*<Collection />*/}
                    </TabPane>
                    <TabPane tab="请求头" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="请求头" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
            <div style={{height: '100%'}}>
                <Tabs defaultActiveKey="1" style={{height: '100%'}} onChange={() => {
                }} tabPosition={'left'}>
                    <TabPane style={{paddingLeft: '0px'}} tab="集合" key="1">
                        <Collection/>
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
