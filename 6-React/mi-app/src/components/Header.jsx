
import { NavLink, useNavigate } from "react-router-dom";

function Header({ logueado, cerrarSesion }) {
  const navigate = useNavigate();

  const logout = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-contenido">
        <h2>Mi Aplicación React</h2>

        <nav>
          <NavLink to="/">Home</NavLink>

          <NavLink to="/login">Login</NavLink>

          <NavLink to="/actividades">Actividades</NavLink>

          {logueado && (
            <button onClick={logout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
