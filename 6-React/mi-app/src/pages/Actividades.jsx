
import { useNavigate, useOutletContext } from "react-router-dom";

import Card from "@/components/Card";
import { activities, diasSemana } from "@/data/actividades";

import "@/styles/Actividades.scss";

function Actividades() {
  const navigate = useNavigate();
  const { logueado } = useOutletContext();

  const inscribirse = (nombreActividad) => {
    alert(`Te inscribiste en ${nombreActividad}`);
  };

  return (
    <div className="actividades-container">
      <div className="actividades-contenido">

        <header className="actividades-header">
          <h1>Listado de Actividades</h1>

          <button onClick={() => navigate("/")}>
            Ir al Home
          </button>
        </header>

        <p className="subtitulo">
          Actividades disponibles y sus horarios
        </p>

        <div className="actividades-lista">

          {activities.map((actividad) => (
            <Card
              key={actividad.nombre}
              titulo={actividad.nombre}
              subtitulo={actividad.descripcion}
            >
              <h3>Horarios</h3>

              <ul>
                {actividad.horarios.map((horario, indice) => (
                  <li key={indice}>
                    <strong>
                      {diasSemana[horario.dia]}:
                    </strong>{" "}
                    {horario["hora-inicio"]} a{" "}
                    {horario["hora-fin"]}
                  </li>
                ))}
              </ul>

              {logueado && (
                <button
                  className="btn-inscribirse"
                  onClick={() => inscribirse(actividad.nombre)}
                >
                  Inscribirse
                </button>
              )}

            </Card>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Actividades;
