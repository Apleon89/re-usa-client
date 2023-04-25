import { createContext, useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { verifyService } from "../services/auth.services";

const authContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  // esta funcion va a contactar al backend para validar el Token
  const validateToken = async () => {
    setIsFetching(true);
    try {
      const response = await verifyService();
      setIsLoggedIn(true);
      setLoggedUser(response.data);
      setIsFetching(false);
    } catch (error) {
      setIsLoggedIn(false);
      setLoggedUser(null);
      setIsFetching(false);
    }
  };

  const passedContext = {
    isLoggedIn,
    loggedUser,
    validateToken,
  };

  useEffect(() => {
    validateToken();
  }, []);

  if (isFetching) {
    return (
      <div className="App" id="credenciales">
        <PropagateLoader />
      </div>
    );
  }

  return (
    <authContext.Provider value={passedContext}>
      {props.children}
    </authContext.Provider>
  );
}

export { authContext, AuthWrapper };
