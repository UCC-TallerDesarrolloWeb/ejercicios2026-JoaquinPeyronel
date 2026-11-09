
import { useNavigate, useOutletContext } from "react-router-dom";
import "@/styles/Actividades.scss";

const activities = [
  {
    nombre: "taekwondo",
    descripcion: "Arte marcial coreana",
    horarios: [
      { dia: 2, "hora-inicio": "18:30", "hora-fin": "20:00" },
      { dia: 4, "hora-inicio": "18:30", "hora-fin": "20:00" },
    ],
  },
  {
    nombre: "zumba",
    descripcion: "ritmos latinos",
    horarios: [
      { dia: 1, "hora-inicio": "19:30", "hora-fin": "20:30" },
    ],
  },
];

const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

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
            <article
              className="actividad-card"
              key={actividad.nombre}
            >
              <h2>{actividad.nombre}</h2>

              <p>{actividad.descripcion}</p>

              <h3>Horarios</h3>

              <ul>
                {actividad.horarios.map((horario, indice) => (
                  <li key={indice}>
                    <strong>{diasSemana[horario.dia]}:</strong>{" "}
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
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Actividades;
