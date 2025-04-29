import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Rate, Tag } from "antd";
import { useCoffeeStore } from "../model/coffeeStore";
import { CoffeeType } from "../types/coffeeTypes";

export const CoffeeCard = ({ coffee }: { coffee: CoffeeType }) => {
  const { addCoffeeToOrder } = useCoffeeStore();
  return (
    <Card
      key={coffee.id}
      cover={<img src={coffee.image} alt={coffee.name} />}
      actions={[
        <Button
          icon={<ShoppingCartOutlined />}
          onClick={() => {
            addCoffeeToOrder({
              id: coffee.id,
              name: coffee.name,
              subTitle: coffee.subTitle,
            });
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
