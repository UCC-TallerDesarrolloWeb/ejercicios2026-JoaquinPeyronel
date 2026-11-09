
function PokeCard({ pokemon }) {
  return (
    <article className="poke-card">

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />

      <h2>{pokemon.name}</h2>

      <p>
        <strong>Número:</strong> #{pokemon.id}
      </p>

      <p>
        <strong>Altura:</strong> {pokemon.height / 10} m
      </p>

      <p>
        <strong>Peso:</strong> {pokemon.weight / 10} kg
      </p>

      <h3>Tipos</h3>

      <ul>
        {pokemon.types.map((tipo) => (
          <li key={tipo.type.name}>
            {tipo.type.name}
          </li>
        ))}
      </ul>

      <h3>Habilidades</h3>

      <ul>
        {pokemon.abilities.map((habilidad) => (
          <li key={habilidad.ability.name}>
            {habilidad.ability.name}
          </li>
        ))}
      </ul>

    </article>
  );
}

export default PokeCard;
