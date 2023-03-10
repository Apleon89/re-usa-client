import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { authContext } from "../context/auth.context"

function PrivatePage(props) {

    const { isLoggedIn } = useContext(authContext)

  if (isLoggedIn) {
    return props.children
  } else {
    return <Navigate to='/acceso' />
  }
}

export default PrivatePage