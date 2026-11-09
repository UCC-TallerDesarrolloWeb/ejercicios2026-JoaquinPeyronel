
import { NavLink } from "react-router-dom";

function Header({ logueado, cerrarSesion }) {
  return (
    <header className="header">
      <h1>Mi aplicación React</h1>

      <nav>
        <NavLink to="/">
          Home
        </NavLink>

        <NavLink to="/actividades">
          Actividades
        </NavLink>

        <NavLink to="/poke">
          Pokémon
        </NavLink>

        <NavLink to="/store">
          Tienda
        </NavLink>

        {logueado ? (
          <button
            type="button"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        ) : (
          <NavLink to="/login">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
