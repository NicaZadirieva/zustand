
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import { clearCart, createOrder, setAddress } from '../model/cartSlice';
import { RootState } from '../model/coffeeStore';
import { OrderItem } from '../types/coffeeTypes';


export const Cart = () => {
    const [ persistedOrderList, address ] = useSelector((state: RootState) => [state.cart.persistedOrderList, state.cart.address]);

    const orderCart = async () => {
    if (address) {
      try {
        createOrder({
          address: address as string,
          persistedOrderList: persistedOrderList as OrderItem[]
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
              <Button type="primary" disabled={address == undefined || address.length == 0} onClick={orderCart}>Сделать заказ</Button>
              <Button onClick={clearCart}>Очистить корзину</Button>
            </>
          ) : (
            <span>Добавьте напитки</span>
          )}
        </aside>
    );
}