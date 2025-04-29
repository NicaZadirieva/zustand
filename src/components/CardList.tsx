import { useShallow } from "zustand/shallow";
import { useCoffeeStore } from "../model/coffeeStore";
import { CoffeeCard } from "./CoffeeCard";

export const CardList = () => {
  const [coffeeList] = useCoffeeStore(useShallow((s) => [s.coffeeList]));
  return (
    <div className="cardsContainer">
      {coffeeList &&
        coffeeList.map((coffee) => {
          return <CoffeeCard key={coffee.id} coffee={coffee} />;
        })}
    </div>
  );
};
