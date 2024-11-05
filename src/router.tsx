import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./views/IndexPage";

import Layout from "./layouts/Layout";
import { lazy, Suspense } from "react";

const FavoritosPage = lazy(() => import("./views/FavoritosPage"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/favoritos"
            element={
              <Suspense fallback="Cargando...">
                <FavoritosPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
