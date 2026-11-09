
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.scss";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const ingresar = (evento) => {
    evento.preventDefault();

    if (usuario === "admin" && password === "admin") {
      console.log("Login OK");

      navigate("/actividades");
    } else {
      console.log("Login Incorrecto");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={ingresar}>
        <h2>Iniciar Sesión</h2>

        <input
          type="text"
          placeholder="Usuario"
          aria-label="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          aria-label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
