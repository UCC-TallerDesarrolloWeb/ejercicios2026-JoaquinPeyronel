
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import Card from "@/components/Card";
import { diasSemana } from "@/data/actividades";

import "@/styles/Actividades.scss";

function Actividades() {
  const navigate = useNavigate();
  const { logueado } = useOutletContext();

  const [activities, setActivities] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    const cargarActividades = async () => {
      try {
        const respuesta = await fetch(
          "http://localhost:4000/activities",
          { signal: controlador.signal }
        );

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar las actividades");
        }

        const datos = await respuesta.json();
        setActivities(datos);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Error al conectar con el servidor");
          console.error(err);
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    };

    cargarActividades();

    return () => controlador.abort();
  }, []);

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

        {cargando && <p>Cargando actividades...</p>}

        {error && <p role="alert">{error}</p>}

        <div className="actividades-lista">
          {activities.map((actividad) => (
            <Card
              key={actividad.id}
              titulo={actividad.nombre}
              subtitulo={actividad.descripcion}
            >
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
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Actividades;
