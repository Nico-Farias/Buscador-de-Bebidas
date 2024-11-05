import { useAppStore } from "../stores/useAppStore";
import { Drink } from "../types";

type DrinkCardProps = {
  drink: Drink;
};

const DrinkCard = ({ drink }: DrinkCardProps) => {
  const selectReceta = useAppStore((state) => state.selectReceta);

  return (
    <div className="border shadow-lg">
      <div className="overflow-hidden">
        <img
          className="hover:scale-125 transition-transform hover:rotate-2"
          src={drink.strDrinkThumb}
          alt="imgDrink"
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
        <button
          type="button"
          onClick={() => selectReceta(drink.idDrink)}
          className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white"
        >
          Ver receta
        </button>
      </div>
    </div>
  );
};

export default DrinkCard;
