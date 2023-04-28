import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivatePage from "./components/PrivatePage";
import AdDetails from "./pages/AdDetails";
import AllAds from "./pages/AllAds";
import AllMessages from "./pages/AllMessages";
import ChatView from "./pages/ChatView";
import DeleteProfile from "./pages/DeleteProfile";
import EditAd from "./pages/EditAd";
import EditUserProfile from "./pages/EditUserProfile";
import Error from "./pages/Error";
import FavouritesUserAds from "./pages/FavouritesUserAds";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewAd from "./pages/NewAd";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import UserAds from "./pages/UserAds";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Signup />} />
        <Route path="/acceso" element={<Login />} />
        <Route path="/todos-anuncios" element={<AllAds />} />
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
        <Route
          path="/perfil/:idUsuario"
          element={
            <PrivatePage>
              <UserProfile />
            </PrivatePage>
          }
        />
        <Route
          path="/perfil/:idUsuario/misAnuncios"
          element={
            <PrivatePage>
              <UserAds />
            </PrivatePage>
          }
        />
        <Route
          path="/perfil/:idUsuario/editar"
          element={
            <PrivatePage>
              <EditUserProfile />
            </PrivatePage>
          }
        />
        <Route
          path="/perfil/:idUsuario/borrarCuenta"
          element={
            <PrivatePage>
              <DeleteProfile />
            </PrivatePage>
          }
        />
        <Route path="/mensajes" element={<PrivatePage><AllMessages /></PrivatePage>} />
        <Route path="/mensajes/:idUsuario" element={<PrivatePage><ChatView /></PrivatePage>} />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
