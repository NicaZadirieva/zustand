import { Transfer, TransferProps } from "antd";
import React, { useState } from "react";
import "./index.css";
import { TodoItem } from "./model/todoStore";

const data: TodoItem[] = [
  {
    title: "Title 1",
    isCompleted: true,
    key: "1"
  },
  {
    title: "Title 2",
    isCompleted: true,
    key: "2"
  },
  {
    title: "Title 3",
    isCompleted: false,
    key: "3"
  },
  {
    title: "Title 4",
    isCompleted: true,
    key: "4"
  },
];
const initialTargetKeys = data.filter((item) => !item.isCompleted).map((item) => item.key);
const App: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>(
    []
  );

  const [targetKeys, setTargetKeys] =
    useState<TransferProps["targetKeys"]>(initialTargetKeys);

  const onChange: TransferProps["onChange"] = (
    nextTargetKeys,
    direction,
    moveKeys
  ) => {
    console.log("targetKeys:", nextTargetKeys);
    console.log("direction:", direction);
    console.log("moveKeys:", moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };



  return (
    <Transfer
      dataSource={data}
      titles={["Done", "Process"]}
      
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}

      render={(item) => <div key={item.title}>{item.title}</div>}
    />
  );
};
export default App;
