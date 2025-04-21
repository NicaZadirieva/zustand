import { Button, Form, Input, Transfer, TransferProps } from "antd";
import React, { useState } from "react";
import "./index.css";
import { useTodoStore } from "./model/todoStore";

const App: React.FC = () => {
  const [form] = Form.useForm();
  const { doneTasks, processingTasks, complete, startProcess, addTodo } =
    useTodoStore();
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

  const onAddTodo = () => {
    addTodo({
      title: form.getFieldValue("taskName"),
      isCompleted: false,
      // последний индекс в незавершенных задачах
      key: '' + ([...processingTasks, ...doneTasks].length + 1),
    });
  };

  return (
    <Form form={form} onFinish={onAddTodo}>
      <Form.Item label="Начать новую задачу" name="taskName">
        <Input required/>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">Добавить задачу</Button>
      </Form.Item>
      <Transfer
        dataSource={[...doneTasks, ...processingTasks]}
        titles={["Process", "Done"]}
        onSelectChange={onSelectChange}
        targetKeys={doneTasks.map((item) => item.key)}
        selectedKeys={selectedKeys}
        onChange={onChange}
        render={(item) => <div key={item.title}>{item.title}</div>}
      />
    </Form>
  );
};
export default App;
