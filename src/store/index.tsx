import create from "zustand";

interface BaseState {
  httpPanes: any;
  setHttpPanes: (a: any) => void;
  httpActiveKey: any;
  setHttpActiveKey: (a: any) => void;
  collections: any;
  setCollections: (a: any) => void;
}
export const useBaseStore = create<BaseState>(
  (set, get) => ({
    // 这边要按模块分，之后再拆
    // 一、Rest模块
    //
    httpPanes: [{ title: "1", key: "123" }],
    httpActiveKey: "1",
    setHttpPanes: (httpPanes: any) => {
      return set(() => ({ httpPanes }));
    },
    setHttpActiveKey: (httpActiveKey: any) => {
      return set(() => ({ httpActiveKey }));
    },
    // 二、集合
    collections: [],
    setCollections: (collections: any) => {
      return set(() => ({ collections }));
    },
    setCollectionActiveKey: "1",
  }),
);
