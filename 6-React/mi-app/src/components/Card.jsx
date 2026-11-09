
import "@/styles/Card.scss";

function Card({ titulo, subtitulo, children }) {
  return (
    <article className="card-actividad">
      <div className="card-actividad-header">
        <h2>{titulo}</h2>
        <p>{subtitulo}</p>
      </div>

      <div className="card-actividad-body">
        {children}
      </div>
    </article>
  );
}

export default Card;
