
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import { formatPrice } from "@/utils/formatPrice";

import "@/styles/Store.scss";

function Store() {
  const { logueado } = useOutletContext();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const controlador = new AbortController();

    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch(
          "http://localhost:4000/productos",
          { signal: controlador.signal }
        );

        if (!respuesta.ok) {
          throw new Error("No se pudieron obtener los productos");
        }

        const datos = await respuesta.json();

        setProductos(datos);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("No se pudieron cargar los productos.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    };

    obtenerProductos();

    return () => controlador.abort();
  }, []);

  const agregarAlCarrito = (producto) => {
    if (!logueado) {
      return;
    }

    setCarrito((carritoAnterior) => {
      const existente = carritoAnterior.find(
        (item) => item.id === producto.id
      );

      if (existente) {
        return carritoAnterior.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...carritoAnterior, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.filter((item) => item.id !== id)
    );
  };

  const total = carrito.reduce(
    (acumulador, item) => acumulador + item.precio * item.cantidad,
    0
  );

  const cantidadTotal = carrito.reduce(
    (acumulador, item) => acumulador + item.cantidad,
    0
  );

  return (
    <main className="store-container">
      <header className="store-encabezado">
        <h1>Tienda de Taekwondo</h1>
        <p>Encontrá todo lo necesario para tus entrenamientos.</p>
      </header>

      {!logueado && (
        <p className="store-aviso">
          Podés explorar los productos, pero para agregarlos al carrito
          necesitás <Link to="/login">iniciar sesión</Link>.
        </p>
      )}

      <section className="store-productos">
        <h2>Productos disponibles</h2>

        {cargando && <p>Cargando productos...</p>}

        {error && <p role="alert">{error}</p>}

        {!cargando && !error && productos.length === 0 && (
          <p>No hay productos disponibles.</p>
        )}

        <div className="store-grilla">
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              logueado={logueado}
              onVerDetalle={setProductoSeleccionado}
              onAgregarCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      </section>

      {logueado && (
        <section className="store-carrito">
          <h2>Mi carrito ({cantidadTotal})</h2>

          {carrito.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              <ul className="carrito-lista">
                {carrito.map((item) => (
                  <li key={item.id} className="carrito-item">
                    <div>
                      <strong>{item.nombre}</strong>
                      <p>
                        Cantidad: {item.cantidad} ×{" "}
                        {formatPrice(item.precio)}
                      </p>
                    </div>

                    <div className="carrito-item-acciones">
                      <strong>
                        {formatPrice(item.precio * item.cantidad)}
                      </strong>

                      <button
                        type="button"
                        className="btn-quitar"
                        onClick={() => quitarDelCarrito(item.id)}
                      >
                        Quitar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="carrito-total">
                <strong>Total: {formatPrice(total)}</strong>
              </div>
            </>
          )}
        </section>
      )}

      <ProductDetail
        producto={productoSeleccionado}
        onCerrar={() => setProductoSeleccionado(null)}
        logueado={logueado}
        onAgregarCarrito={agregarAlCarrito}
      />
    </main>
  );
}

export default Store;
