import { Input } from "antd";
import React, {
  useEffect
} from "react";
import "./App.css";
import { Cart } from './components/Cart';
import { CoffeeCard } from './components/CoffeeCard';
import { useUrlStorage } from './helpers/useUrlStorage';
import "./index.css";
import { useCoffeeStore } from "./model/coffeeStore";

const App: React.FC = () => {
  const {
    getCoffeeList,
    coffeeList,
    params,
    setParams
  } = useCoffeeStore();

  useEffect(() => {
    getCoffeeList(params);
  }, [getCoffeeList, params]);

  useUrlStorage(params, setParams);

  return (
    <div className="wrapper">
      <Input placeholder="Поиск" value={params.text} onChange={(e) => setParams({ text: e.target.value })} />
      <div style={{ display: "flex" }}>
        <div className="cardsContainer">
          {coffeeList &&
            coffeeList.map((coffee) => {
              return (
                <CoffeeCard coffee={coffee}/>
              );
            })}
        </div>
        <Cart/>
      </div>
    </div>
  );
};
export default App;
