import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Rate, Tag } from 'antd';
import React from "react";
import "./index.css";
import { CoffeeType } from './types/coffeeTypes';

const App: React.FC = () => {
  const coffeeList : CoffeeType[] | undefined = [];
  return (<div className="wrapper">
    <div className='cardsContainer'>
      {coffeeList && coffeeList.map((coffee) => {
        return (
          <Card key={coffee.id} cover={<img src={coffee.imageUrl} alt={coffee.name}
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
