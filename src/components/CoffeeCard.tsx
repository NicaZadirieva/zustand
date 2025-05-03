import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Rate, Tag } from "antd";
import { useDispatch } from 'react-redux';
import { addCoffeeToOrder } from '../model/cartSlice';
import { appDispatch } from '../model/coffeeStore';
import { CoffeeType } from "../types/coffeeTypes";

export const CoffeeCard = ({ coffee }: { coffee: CoffeeType }) => {
  const dispatch = useDispatch<appDispatch>();
  return (
    <Card

      cover={<img src={coffee.image} alt={coffee.name} />}
      actions={[
        <Button
          icon={<ShoppingCartOutlined />}
          onClick={() => {
            dispatch(addCoffeeToOrder({
              id: coffee.id,
              name: coffee.name,
              subTitle: coffee.subTitle,
            }));
          }}
        >
          {coffee.price}
        </Button>,
      ]}
    >
      <Card.Meta title={coffee.name} description={coffee.subTitle} />
      <Tag color="purple" style={{ marginTop: 12 }}>
        {coffee.type}
      </Tag>
      <Rate defaultValue={coffee.rating} disabled allowHalf />
    </Card>
  );
};
