import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Input, Rate, Tag } from "antd";
import React, {
  useEffect,
  useState
} from "react";
import "./App.css";
import { useUrlStorage } from './helpers/useUrlStorage';
import "./index.css";
import { useCoffeeStore } from "./model/coffeeStore";

const App: React.FC = () => {
  const {
    getCoffeeList,
    coffeeList,
    persistedOrderList,
    addCoffeeToOrder,
    clearCart,
    createOrder,
    params,
    setParams
  } = useCoffeeStore();

  const [address, setAddress] = useState<string | undefined>();

  useEffect(() => {
    getCoffeeList(params);
  }, [getCoffeeList, params]);

  useUrlStorage(params, setParams);
  const orderCart = async () => {
    if (address) {
      try {
        await createOrder({
          address,
        });
        alert("Выполнено успешно");
      } catch {
        alert("Повторите еще раз");
      }
    }
  };

  return (
    <div className="wrapper">
      <Input placeholder="Поиск" value={params.text} onChange={(e) => setParams({ text: e.target.value })} />
      <div style={{ display: "flex" }}>
        <div className="cardsContainer">
          {coffeeList &&
            coffeeList.map((coffee) => {
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
                  <Card.Meta
                    title={coffee.name}
                    description={coffee.subTitle}
                  />
                  <Tag color="purple" style={{ marginTop: 12 }}>
                    {coffee.type}
                  </Tag>
                  <Rate defaultValue={coffee.rating} disabled allowHalf />
                </Card>
              );
            })}
        </div>
        <aside className="cart">
          <h1>Заказ</h1>
          {persistedOrderList && persistedOrderList.length > 0 ? (
            <>
              {persistedOrderList.map((item, index) => {
                return (
                  <span key={index}>
                    {item.name} {item.subTitle} - {item.quantity} шт.
                  </span>
                );
              })}
              <Input
                placeholder="адрес"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <Button type="primary" disabled={address == undefined || address.length == 0} onClick={orderCart}>Сделать заказ</Button>
              <Button onClick={clearCart}>Очистить корзину</Button>
            </>
          ) : (
            <span>Добавьте напитки</span>
          )}
        </aside>
      </div>
    </div>
  );
};
export default App;
