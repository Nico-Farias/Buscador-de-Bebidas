import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

const Header = () => {
  const [searchFilter, setSearchFilter] = useState({
    ingredientes: "",
    categoria: "",
  });
  const location = useLocation();

  const isHome = useMemo(() => location.pathname === "/", [location.pathname]);
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categorias = useAppStore((state) => state.categorias);
  const searchRecetas = useAppStore((state) => state.searchRecetas);
  const showNotication = useAppStore((state) => state.showNotication);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilter({
      ...searchFilter,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: validar
    if (Object.values(searchFilter).includes("")) {
      showNotication({
        text: "Todos los compos son obligatorios",
        error: true,
      });
      return;
    }

    //CONSULTAR RECETAS
    searchRecetas(searchFilter);
  };

  return (
    <header
      className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="logotipo" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
              to="/"
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
              to="/favoritos"
            >
              favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            onSubmit={handleSubmit}
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 space-y-6 rounded-lg shadow "
          >
            <div className="space-y-4 ">
              <label
                htmlFor="ingredientes"
                className="block text-white uppercase font-extrabold text-lg "
              >
                Ingredientes
              </label>
              <input
                className="p-3 w-full rounded-lg focus:outline-none"
                type="text"
                id="ingredientes"
                name="ingredientes"
                placeholder="Nombre o ingredientes"
                onChange={handleChange}
                value={searchFilter.ingredientes}
              />
            </div>

            <div className="space-y-4 mt-5">
              <label
                htmlFor="categoria"
                className="block text-white uppercase font-extrabold text-lg"
              >
                categorias
              </label>
              <select
                className="p-3 w-full rounded-lg focus:outline-none"
                id="categoria"
                name="categoria"
                value={searchFilter.categoria}
                onChange={handleChange}
              >
                <option> -- Seleccione --</option>
                {categorias.drinks.map((cat) => (
                  <option
                    className="font-medium"
                    key={cat.strCategory}
                    value={cat.strCategory}
                  >
                    {cat.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar Recetas"
              className="cursor-pointer bg-orange-800 text-white font-extrabold w-full rounded-lg p-2 hover:bg-orange-900 uppercase "
            />
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
