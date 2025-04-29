import React from "react";
import "./App.css";
import { CardList } from './components/CardList';
import { Cart } from './components/Cart';
import { SearchInput } from './components/SearchInput';
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <SearchInput/>
      <div style={{ display: "flex" }}>
        <CardList/>
        <Cart/>
      </div>
    </div>
  );
};
export default App;
