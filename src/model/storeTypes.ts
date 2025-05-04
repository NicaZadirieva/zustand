import {
  CoffeeType,
  GetCoffeeListReqParams,
  OrderCoffeeRes,
  OrderItem,
} from "../types/coffeeTypes";

export type ListState = {
  coffeeList?: CoffeeType[];
  controller?: AbortController;
  params: GetCoffeeListReqParams;
};

export type ListActions = {
  getCoffeeList: (params?: GetCoffeeListReqParams) => Promise<CoffeeType[]>;
  setParams: (params?: GetCoffeeListReqParams) => void;
};

export type CartState = {
  persistedOrderList?: OrderItem[];
  address?: string;
};

export type CartActions = {
  clearCart: () => void;
  createOrder: ({
    address,
  }: {
    address: string;
  }) => Promise<OrderCoffeeRes | void>;
  setAddress: (address: string) => void;
  addCoffeeToOrder: ({
    id,
    name,
    subTitle,
  }: {
    id: number;
    name: string;
    subTitle: string;
  }) => void;

};
