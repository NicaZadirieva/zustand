import { Transfer, TransferProps } from "antd";
import React, { useState } from "react";
import "./index.css";
import { useTodoStore } from "./model/todoStore";

const App: React.FC = () => {

  const { doneTasks, processingTasks, complete, startProcess } = useTodoStore();
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>(
    []
  );

  const onChange: TransferProps["onChange"] = (
    nextTargetKeys,
    direction,
    moveKeys
  ) => {
    console.log("targetKeys:", nextTargetKeys);
    console.log("direction:", direction);
    console.log("moveKeys:", moveKeys);
    if (direction == "left") {
      startProcess(moveKeys);
    } else {
      complete(moveKeys);
    }
  };

   const onSelectChange: TransferProps["onSelectChange"] = (
     sourceSelectedKeys,
     targetSelectedKeys
   ) => {
     setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
   };

 



  return (
    <Transfer
      dataSource={[...doneTasks, ...processingTasks]}
      titles={["Process", "Done"]}
      onSelectChange={onSelectChange}
      targetKeys={doneTasks.map((item) => item.key)}
      selectedKeys={selectedKeys}
      onChange={onChange}


      render={(item) => <div key={item.title}>{item.title}</div>}
    />
  );
};
export default App;
