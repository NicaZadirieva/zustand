import { Button, Input } from 'antd';
import { useShallow } from 'zustand/shallow';
import { clearCart, createOrder, setAddress, useCoffeeStore } from '../model/coffeeStore';

export const Cart = () => {
    const [ persistedOrderList, address ] = useCoffeeStore(useShallow(state => [state.persistedOrderList, state.address]));

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
    );
}