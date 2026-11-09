
import { useEffect, useState } from "react";

import PokeCard from "@/components/PokeCard";
import "@/styles/Poke.scss";

function Poke() {
  const [pokemones, setPokemones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    const obtenerPokemones = async () => {
      try {
        // Creamos las 20 peticiones, una por cada Pokémon.
        const peticiones = [];

        for (let i = 1; i <= 20; i++) {
          peticiones.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`, {
              signal: controlador.signal,
            })
          );
        }

        // Esperamos que terminen todas las peticiones.
        const respuestas = await Promise.all(peticiones);

        // Comprobamos que todas las respuestas sean correctas.
        if (respuestas.some((respuesta) => !respuesta.ok)) {
          throw new Error("Error al obtener los Pokémon");
        }

        // Convertimos las respuestas a objetos JavaScript.
        const datos = await Promise.all(
          respuestas.map((respuesta) => respuesta.json())
        );

        setPokemones(datos);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("No se pudieron cargar los Pokémon");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    };

    obtenerPokemones();

    return () => controlador.abort();
  }, []);

  return (
    <section className="poke-container">
      <h1>Pokémon API</h1>

      <p>Primeros 20 Pokémon obtenidos desde PokeAPI.</p>

      {cargando && <p>Cargando Pokémon...</p>}

      {error && <p role="alert">{error}</p>}

      <div className="poke-lista">
        {pokemones.map((pokemon) => (
          <PokeCard
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      </div>
    </section>
  );
}

export default Poke;
