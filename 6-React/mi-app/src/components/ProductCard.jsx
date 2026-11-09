
import { formatPrice } from "@/utils/formatPrice";

function ProductCard({ producto, logueado, onVerDetalle, onAgregarCarrito }) {
  return (
    <article className="producto-card">

      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="producto-imagen"
      />

      <div className="producto-info">
        <h2>{producto.nombre}</h2>

        <p className="producto-marca">
          {producto.marca}
        </p>

        <p className="producto-precio">
          {formatPrice(producto.precio)}
        </p>

        <div className="producto-acciones">

          <button
            type="button"
            className="btn-detalle"
            onClick={() => onVerDetalle(producto)}
          >
            Ver detalle
          </button>

          {logueado && (
            <button
              type="button"
              className="btn-agregar"
              onClick={() => onAgregarCarrito(producto)}
            >
              Agregar al carrito
            </button>
          )}

        </div>
      </div>

    </article>
  );
}

export default ProductCard;
