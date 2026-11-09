
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home">
      <h1>Bienvenido a nuestra aplicación React</h1>

      <p>
        En esta aplicación podemos iniciar sesión y consultar
        las actividades disponibles.
      </p>

      <div className="home-acciones">
        <Link to="/login" className="enlace-boton">
          Iniciar Sesión
        </Link>

        <Link to="/actividades" className="enlace-boton secundario">
          Ver Actividades
        </Link>
      </div>
    </section>
  );
}

export default Home;
