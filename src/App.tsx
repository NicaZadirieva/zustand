import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Input, Rate, Tag } from 'antd';
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { useCoffeeStore } from './model/coffeeStore';

const App: React.FC = () => {
  const { getCoffeeList, coffeeList, persistedOrderList, saveCoffeeToOrder, clearCart } = useCoffeeStore();
  const [text, setText] = useState<string | undefined>();

  useEffect(() => {
    getCoffeeList();
  }, [getCoffeeList])

  const findCoffee = (text: string) => {
    setText(text);
    getCoffeeList({ text });
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent) => {
    findCoffee((e.target as HTMLInputElement).value);
  }

  
  return (<div className="wrapper">
    <Input placeholder='Поиск' value={text} onChange={handleSearch}/>
    <div style={{display: "flex"}}>
    <div className='cardsContainer'>
      {coffeeList && coffeeList.map((coffee) => {
        return (
          <Card key={coffee.id} cover={<img src={coffee.image} alt={coffee.name}
          />} actions={[<Button icon={<ShoppingCartOutlined/>} onClick={() => {saveCoffeeToOrder({ id: coffee.id, name: coffee.name, subTitle: coffee.subTitle})}}>{coffee.price}</Button>]}>
              <Card.Meta title={coffee.name} description={coffee.subTitle}/>
              <Tag color="purple" style={{marginTop: 12}}>{coffee.type}</Tag>
              <Rate defaultValue={coffee.rating} disabled allowHalf/>
          </Card>
        )
      })}
    </div>
    <aside className="cart">
      <h1>Заказ</h1>
      {persistedOrderList && persistedOrderList.length > 0 ? (<>
       {persistedOrderList.map((item, index) => {
        return <span key={index}>{item.name} {item.subTitle} - {item.quantity} шт.</span>;
       })}
       <Input placeholder='адрес'/>
       <Button type="primary">Сделать заказ</Button>
       <Button onClick={clearCart}>Очистить корзину</Button>
      </>): <span>Добавьте напитки</span>}
    </aside>
    </div>
  </div>);
};
export default App;
