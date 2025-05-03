
import { useSelector } from 'react-redux';
import { RootState } from '../model/coffeeStore';
import { CoffeeCard } from "./CoffeeCard";

export const CardList = () => {
  const coffeeList = useSelector((s: RootState) => s.list.coffeeList);
  return (
    <div className="cardsContainer">
      {coffeeList &&
        coffeeList.map((coffee) => {
          return <CoffeeCard key={coffee.id} coffee={coffee} />;
        })}
    </div>
  );
};
