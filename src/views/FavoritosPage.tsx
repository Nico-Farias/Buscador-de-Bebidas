import { useMemo } from "react";
import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";

const FavoritosPage = () => {
  const favoritos = useAppStore((state) => state.favoritos);

  const hasFavoritos = useMemo(() => favoritos.length, [favoritos]);

  return (
    <>
      <h1 className="text-6xl font-extrabold  ">Favoritos</h1>

      {hasFavoritos ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {favoritos.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">
          Aun no tienes favoritos, cuando los tengas se mostraran aqui!
        </p>
      )}
    </>
  );
};

export default FavoritosPage;
