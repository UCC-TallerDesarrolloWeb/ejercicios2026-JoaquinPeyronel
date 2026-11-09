
const productos = [
  {
    nombre: "Cabezal Sparring",
    description: "Cabezal de Sparring.",
    categoria: "Protectores",
    marca: "Gran Marc",
    talle: ["1", "2", "3"],
    precio: 35000,
    web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/",
    imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/cabezal-cerrado.webp",
  },
  {
    nombre: "Dobok Dan",
    description: "Bobok aprobado para torneos internacionales.",
    categoria: "Dobok",
    marca: "Daedo",
    talle: ["1", "2", "3", "4", "5", "6", "7", "8"],
    precio: 115000,
    web: "https://www.daedo.com/products/taitf-10813",
    imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/dobok.webp",
  },
  {
    nombre: "Escudo de Potencia",
    description: "Escudo de potencia para entrenamientos.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 51700,
    web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/",
    imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/escudo-potencia.webp",
  },
  {
    nombre: "Par de focos redondos",
    description: "Par de focos de 25cm x 25cm para hacer entrenamiento.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 15000,
    web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/",
    imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/foco-con-dedos.webp",
  },
  {
    nombre: "Guantes 10 onzas",
    description: "Guantes de Sparring de 10 onzas habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["s/talle"],
    precio: 35000,
    web: "https://www.daedo.com/products/pritf-2020",
    imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/protectores-manos.webp",
  },
  {
    nombre: "Protectores Pie",
    description: "Protectores de Pie habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["XXS", "XS", "S", "M", "L", "XL"],
    precio: 35000,
    web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
    imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/protectores-pie.webp",
  },
];

// FORMATEAR PRECIOS

const formatearPrecio = (precio) => {
  const formato = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return "$" + formato.format(precio);
};

// MOSTRAR PRODUCTOS DEL CATÁLOGO

const mostrarProductos = (listaProductos = productos) => {
  const contenedor = document.getElementById("contenedorProductos");

  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = "";

  if (listaProductos.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  listaProductos.forEach((producto) => {
    const indice = productos.indexOf(producto);
    const tarjeta = document.createElement("div");

    tarjeta.className = "tarjeta";

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: ${formatearPrecio(producto.precio)}</p>

      <button onclick="abrirDialog(${indice})">
        Ver detalle de Producto
      </button>

      <button onclick="agregarAlCarrito(${indice})">
        Agregar al carrito
      </button>
    `;

    contenedor.appendChild(tarjeta);
  });
};

// FILTRAR PRODUCTOS

const filtrarProductos = () => {
  const contenedor = document.getElementById("contenedorProductos");

  if (!contenedor) {
    return;
  }

  const palabra = document.getElementById("buscar").value
    .toLowerCase()
    .trim();

  const minimoTexto = document.getElementById("minimo").value;
  const maximoTexto = document.getElementById("maximo").value;
  const marca = document.getElementById("marca").value;

  const categorias = Array.from(
    document.querySelectorAll('input[name="tipo"]:checked')
  ).map((checkbox) => checkbox.value);

  const productosFiltrados = productos.filter((producto) => {
    const coincidePalabra =
      producto.nombre.toLowerCase().includes(palabra);

    const coincideMinimo =
      minimoTexto === "" || producto.precio >= Number(minimoTexto);

    const coincideMaximo =
      maximoTexto === "" || producto.precio <= Number(maximoTexto);

    const coincideMarca =
      marca === "" || producto.marca === marca;

    const coincideCategoria =
      categorias.length === 0 ||
      categorias.includes(producto.categoria);

    return (
      coincidePalabra &&
      coincideMinimo &&
      coincideMaximo &&
      coincideMarca &&
      coincideCategoria
    );
  });

  // Ordenar la lista filtrada antes de mostrarla.
  const listaOrdenada = aplicarOrden(productosFiltrados);

  mostrarProductos(listaOrdenada);
};

// ORDENAR PRODUCTOS

const aplicarOrden = (listaProductos) => {
  const selector = document.getElementById("ordenar");
  const orden = selector ? selector.value : "";

  // Copiamos el array para no modificar el catálogo original.
  const lista = [...listaProductos];

  switch (orden) {
    case "precioAsc":
      lista.sort((a, b) => a.precio - b.precio);
      break;

    case "precioDesc":
      lista.sort((a, b) => b.precio - a.precio);
      break;

    case "nombreAsc":
      lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
      break;

    case "nombreDesc":
      lista.sort((a, b) => b.nombre.localeCompare(a.nombre, "es"));
      break;
  }

  return lista;
};

const ordenarProductos = () => {
  // Reaplicamos los filtros para conservar las búsquedas existentes.
  filtrarProductos();
};

// MOSTRAR DETALLE DEL PRODUCTO

const abrirDialog = (indice) => {
  const producto = productos[indice];
  const dialog = document.getElementById("detalleProducto");

  dialog.innerHTML = `
    <h2>${producto.nombre}</h2>

    <img
      src="${producto.imagen}"
      alt="${producto.nombre}"
      width="250">

    <p>${producto.description}</p>
    <p><strong>Marca:</strong> ${producto.marca}</p>
    <p><strong>Categoría:</strong> ${producto.categoria}</p>
    <p><strong>Precio:</strong> ${formatearPrecio(producto.precio)}</p>

    <button onclick="cerrarDialog()">
      Cerrar
    </button>
  `;

  dialog.showModal();
};

const cerrarDialog = () => {
  document.getElementById("detalleProducto").close();
};

// AGREGAR PRODUCTO AL CARRITO

const agregarAlCarrito = (indice) => {
  const producto = productos[indice];
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarContadorCarrito();

  alert("Producto agregado al carrito");
};

// ACTUALIZAR CONTADOR DEL CARRITO

const actualizarContadorCarrito = () => {
  const contador = document.getElementById("contadorCarrito");

  if (!contador) {
    return;
  }

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  contador.textContent = carrito.length;
};

// MOSTRAR PRODUCTOS DEL CARRITO

const mostrarCarrito = () => {
  const contenedor = document.getElementById("contenedorCarrito");

  if (!contenedor) {
    return;
  }

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  contenedor.innerHTML = "";

  // Agrupar productos repetidos.
  const productosAgrupados = [];

  carrito.forEach((producto) => {
    const existente = productosAgrupados.find(
      (item) => item.nombre === producto.nombre
    );

    if (existente) {
      existente.cantidad++;
    } else {
      productosAgrupados.push({
        ...producto,
        cantidad: 1,
      });
    }
  });

  if (productosAgrupados.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
  } else {
    productosAgrupados.forEach((producto) => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta";

      const subtotal = producto.precio * producto.cantidad;

      // JSON.stringify permite pasar el nombre como argumento.
      // Usamos comillas dobles en el atributo HTML.
      tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>Precio unitario: ${formatearPrecio(producto.precio)}</p>
        <p><strong>Cantidad: ${producto.cantidad}</strong></p>
        <p>Subtotal: ${formatearPrecio(subtotal)}</p>

        <button class="eliminar-producto">
          Eliminar una unidad
        </button>
      `;

      tarjeta.querySelector(".eliminar-producto").addEventListener(
        "click",
        () => eliminarProducto(producto.nombre)
      );

      contenedor.appendChild(tarjeta);
    });
  }

  const total = carrito.reduce(
    (acumulador, producto) => acumulador + producto.precio,
    0
  );

  const cantidad = carrito.length;

  document.getElementById("cantidadProductos").textContent = cantidad;
  document.getElementById("totalCarrito").textContent =
    formatearPrecio(total);

  actualizarContadorCarrito();
};

// VACIAR CARRITO

const vaciarCarrito = () => {
  localStorage.removeItem("carrito");
  mostrarCarrito();
};

// ELIMINAR UNA UNIDAD DE UN PRODUCTO

const eliminarProducto = (nombre) => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const indice = carrito.findIndex(
    (producto) => producto.nombre === nombre
  );

  if (indice !== -1) {
    carrito.splice(indice, 1);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();
};

// CARGAR PÁGINA

window.onload = () => {
  filtrarProductos();
  mostrarCarrito();
  actualizarContadorCarrito();
};
