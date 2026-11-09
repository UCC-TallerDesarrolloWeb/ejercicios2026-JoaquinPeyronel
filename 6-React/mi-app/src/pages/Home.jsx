
import imagen3 from "@/assets/home/imagen3.jpg";
import imagen4 from "@/assets/home/imagen4.jpg";

import "@/styles/Home.scss";

const actividades = [
  {
    nombre: "Taekwondo",
    imagen: "/home/imagen1.jpg",
  },
  {
    nombre: "Yoga",
    imagen: "/home/imagen2.jpg",
  },
  {
    nombre: "Zumba",
    imagen: imagen3,
  },
  {
    nombre: "Entrenamiento Funcional",
    imagen: imagen4,
  },
];

function Home() {
  return (
    <section className="home-actividades">
      <h1>Nuestras Actividades</h1>

      <p>Conocé las actividades que tenemos para vos.</p>

      <div className="home-galeria">
        {actividades.map((actividad) => (
          <article className="home-card" key={actividad.nombre}>
            <img
              src={actividad.imagen}
              alt={actividad.nombre}
            />

            <h2>{actividad.nombre}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Home;
