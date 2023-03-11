import { Link } from "react-router-dom";

function Error() {
    return (
      <div>
        <h3>Error 500. Problemas de servidor :(</h3>
        <Link to='/anuncios'>Anuncios</Link>
      </div>
    );
  }
  
  export default Error;