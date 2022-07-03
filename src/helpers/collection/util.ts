// 数组转树通用方法

export function arrToTree(arr: any, pid = 0) {
  const newArr: any = [];
  arr.forEach(
    (item: any) => {
      if (item.pid === pid) {
        newArr.push({
          ...item,
          children: arrToTree(arr, item.id),
        },);
      }
    },
  );
  return newArr;
}

// 再转antd的treeData数据结构

export function treeToAntdTreeData(tree: any, pid = 0) {
  return tree.map(
    (item: any) => {
      // console.log(iconMap[item.type],'item')
      if (item.children && item.children.length > 0) {
        return {
          key: String(item.id),
          title: item.name + item.type,
          isLeaf: false,
          ...item,
          children: treeToAntdTreeData(item.children),
        };
      } else {
        return {
          key: String(item.id),
          title: item.name + item.type,
          isLeaf: false,
          ...item,
        };
      }
    },
  );
}
