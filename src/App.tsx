import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Input, Rate, Tag } from 'antd';
import React, { KeyboardEvent, KeyboardEventHandler, useEffect } from "react";
import "./App.css";
import "./index.css";
import { useCoffeeStore } from './model/coffeeStore';

const App: React.FC = () => {
  const { getCoffeeList, coffeeList } = useCoffeeStore();
  useEffect(() => {
    getCoffeeList();
  }, [getCoffeeList])

  const findCoffee = (coffeeName: string) => {
    getCoffeeList({text: coffeeName});
  };

  const handleSearch: KeyboardEventHandler<HTMLInputElement> = (e: KeyboardEvent) => {
    findCoffee((e.target as HTMLInputElement).value);
  }
  
  return (<div className="wrapper">
    <Input placeholder='Поиск' onPressEnter={handleSearch}/>
    <div className='cardsContainer'>
      {coffeeList && coffeeList.map((coffee) => {
        return (
          <Card key={coffee.id} cover={<img src={coffee.image} alt={coffee.name}
          />} actions={[<Button icon={<ShoppingCartOutlined/>}>{coffee.price}</Button>]}>
              <Card.Meta title={coffee.name} description={coffee.subTitle}/>
              <Tag color="purple" style={{marginTop: 12}}>{coffee.type}</Tag>
              <Rate defaultValue={coffee.rating} disabled allowHalf/>
          </Card>
        )
      })}
    </div>
  </div>);
};
export default App;
