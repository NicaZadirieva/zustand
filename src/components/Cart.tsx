import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, createOrder, setAddress } from "../model/cartSlice";
import { appDispatch, RootState } from "../model/coffeeStore";
import { OrderItem } from "../types/coffeeTypes";

export const Cart = () => {
  const dispatch = useDispatch<appDispatch>();
  const  persistedOrderList = useSelector((state: RootState) => (
    state.cart.persistedOrderList
  ));
  const  address = useSelector((state: RootState) => (
    state.cart.address
  ));

  const orderCart = async () => {
    if (address) {
      try {
        dispatch(
          createOrder({
            address: address as string,
            persistedOrderList: persistedOrderList as OrderItem[],
          })
        );
        alert("Выполнено успешно");
      } catch {
        alert("Повторите еще раз");
      }
    }
  };
  return (
    <aside className="cart">
      <h1>Заказ</h1>
      {persistedOrderList && persistedOrderList.length > 0 ? (
        <>
          {(persistedOrderList as OrderItem[]).map((item, index) => {
            return (
              <span key={index}>
                {item.name} {item.subTitle} - {item.quantity} шт.
              </span>
            );
          })}
          <Input
            placeholder="адрес"
            value={address as string}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <Button
            type="primary"
            disabled={address == undefined || address.length == 0}
            onClick={orderCart}
          >
            Сделать заказ
          </Button>
          <Button onClick={() => dispatch(clearCart())}>
            Очистить корзину
          </Button>
        </>
      ) : (
        <span>Добавьте напитки</span>
      )}
    </aside>
  );
};
