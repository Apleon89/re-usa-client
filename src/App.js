import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivatePage from "./components/PrivatePage";
import AdDetails from "./pages/AdDetails";
import AllAds from "./pages/AllAds";
import EditAd from "./pages/EditAd";
import Error from "./pages/Error";
import FavouritesUserAds from "./pages/FavouritesUserAds";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewAd from "./pages/NewAd";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Signup />} />
        <Route path="/acceso" element={<Login />} />
        <Route
          path="/anuncios"
          element={
            <PrivatePage>
              <AllAds />
            </PrivatePage>
          }
        />
        <Route
          path="/anuncios/:idProducto"
          element={
            <PrivatePage>
              <AdDetails />
            </PrivatePage>
          }
        />
        <Route
          path="/anuncios/anadir"
          element={
            <PrivatePage>
              <NewAd />
            </PrivatePage>
          }
        />
        <Route
          path="/anuncios/:idProducto/editar"
          element={
            <PrivatePage>
              <EditAd />
            </PrivatePage>
          }
        />
        <Route
          path="/anuncios/favoritos"
          element={
            <PrivatePage>
              <FavouritesUserAds />
            </PrivatePage>
          }
        />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
