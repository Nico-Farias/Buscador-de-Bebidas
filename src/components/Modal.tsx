import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAppStore } from "../stores/useAppStore";
import { RecetaById } from "../types/index";

export default function Modal() {
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const selectedReceta = useAppStore((state) => state.selectedReceta);
  const favoritoExiste = useAppStore((state) => state.favoritoExiste);

  const handleClickFavoritos = useAppStore(
    (state) => state.handleClickFavoritos
  );

  const renderIngredientes = () => {
    const ingredientes: JSX.Element[] = [];

    for (let i = 1; i <= 6; i++) {
      const ingrediente =
        selectedReceta[`strIngredient${i}` as keyof RecetaById];
      const cantidad = selectedReceta[`strMeasure${i}` as keyof RecetaById];
      if (ingrediente && cantidad) {
        ingredientes.push(
          <li key={i} className="text-lg font-normal">
            {ingrediente} - {cantidad}
          </li>
        );
      }
    }

    return ingredientes;
  };

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-4xl font-extrabold my-5 text-center"
                  >
                    {selectedReceta.strDrink}
                  </Dialog.Title>
                  <img
                    className="mx-auto  text-center max-w-72"
                    src={selectedReceta.strDrinkThumb}
                    alt={`img de ${selectedReceta.strDrink}`}
                  />

                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Ingredientes y cantidades
                  </Dialog.Title>
                  {renderIngredientes()}
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Instrucciones
                  </Dialog.Title>
                  <p>{selectedReceta.strInstructions}</p>

                  <div className="flex  justify-between gap-4 mt-10">
                    <button
                      onClick={closeModal}
                      type="button"
                      className="w-full rounded-lg bg-gray-600 p-3 font-bold uppercase shadow text-white hover:bg-gray-500"
                    >
                      Cerrar
                    </button>
                    <button
                      onClick={() => [
                        handleClickFavoritos(selectedReceta),
                        closeModal(),
                      ]}
                      type="button"
                      className="w-full rounded-lg bg-orange-600 p-3 font-bold uppercase shadow text-white hover:bg-orange-500"
                    >
                      {favoritoExiste(selectedReceta.idDrink)
                        ? "Eliminar de favoritos"
                        : "Agregar a favoritos"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}