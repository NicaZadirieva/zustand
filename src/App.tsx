import { Flex } from "antd";
import React from "react";
import "./App.css";
import { CardList } from "./components/CardList";
import { Cart } from "./components/Cart";
import { SearchInput } from "./components/SearchInput";
import { SelectCategory } from "./components/SelectCategory";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Flex gap={8}>
        <SelectCategory />
        <SearchInput />
      </Flex>
      <div style={{ display: "flex" }}>
        <CardList />
        <Cart />
      </div>
    </div>
  );
};
export default App;
