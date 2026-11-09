
import { formatPrice } from "@/utils/formatPrice";

function ProductDetail({ producto, onCerrar, logueado, onAgregarCarrito }) {
  if (!producto) {
    return null;
  }

  return (
    <div className="producto-modal-fondo" onClick={onCerrar}>
      <div
        className="producto-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tituloProducto"
        onClick={(evento) => evento.stopPropagation()}
      >
        <button
          type="button"
          className="producto-modal-cerrar"
          onClick={onCerrar}
          aria-label="Cerrar detalle"
        >
          ×
        </button>

        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="producto-modal-imagen"
        />

        <h2 id="tituloProducto">{producto.nombre}</h2>

        <p>{producto.descripcion}</p>

        <p>
          <strong>Marca:</strong> {producto.marca}
        </p>

        <p>
          <strong>Categoría:</strong> {producto.categoria}
        </p>

        <p className="producto-modal-precio">
          <strong>Precio:</strong> {formatPrice(producto.precio)}
        </p>

        {logueado && (
          <button
            type="button"
            className="btn-agregar"
            onClick={() => {
              onAgregarCarrito(producto);
              onCerrar();
            }}
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
