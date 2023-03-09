import { Link } from "react-router-dom"

function Home() {
  return (
    <>
        <h2>Re-Usa</h2>
        <Link to='/registro'><button>Regístrate</button></Link>
        <Link to='/acceso'><button>Entrar</button></Link>
    </>
  )
}

export default Home