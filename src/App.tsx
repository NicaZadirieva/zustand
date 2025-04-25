import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Rate, Tag } from 'antd';
import React, { useEffect } from "react";
import "./App.css";
import "./index.css";
import { useCoffeeStore } from './model/coffeeStore';

const App: React.FC = () => {
  const { getCoffeeList, coffeeList } = useCoffeeStore();
  useEffect(() => {
    getCoffeeList();
  })
  
  return (<div className="wrapper">
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
