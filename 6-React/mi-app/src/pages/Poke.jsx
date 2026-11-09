
import { useEffect, useState } from "react";

import PokeCard from "@/components/PokeCard";
import "@/styles/Poke.scss";

function Poke() {
  const [pokemon, setPokemon] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    const obtenerPokemon = async () => {
      try {
        const respuesta = await fetch(
          "https://pokeapi.co/api/v2/pokemon/1",
          { signal: controlador.signal }
        );

        if (!respuesta.ok) {
          throw new Error("Error al obtener el Pokémon");
        }

        const datos = await respuesta.json();

        setPokemon(datos);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
          setError("No se pudo cargar el Pokémon");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    };

    obtenerPokemon();

    return () => controlador.abort();
  }, []);

  return (
    <section className="poke-container">
      <h1>Pokémon API</h1>

      <p>Información obtenida desde PokeAPI utilizando React.</p>

      {cargando && <p>Cargando Pokémon...</p>}

      {error && <p role="alert">{error}</p>}

      {pokemon && <PokeCard pokemon={pokemon} />}
    </section>
  );
}

export default Poke;
