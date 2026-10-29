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
    description:
      "Guantes de Sparring de 10 onzas habilitados para torneos internacionales",
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

const mostrarProductos = () => {
  const contenedor = document.getElementById("contenedorProductos");

  if (!contenedor) {
    return;
  }

  productos.forEach((producto, indice) => {
    const tarjeta = document.createElement("div");

    tarjeta.className = "tarjeta";

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>

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
    <p><strong>Precio:</strong> $${producto.precio}</p>

    <button onclick="cerrarDialog()">
      Cerrar
    </button>
  `;

  dialog.showModal();
};

const cerrarDialog = () => {
  document.getElementById("detalleProducto").close();
};

const agregarAlCarrito = (indice) => {
  const producto = productos[indice];

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push(producto);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert("Producto agregado al carrito");
};

const mostrarCarrito = () => {
  const contenedor = document.getElementById("contenedorCarrito");

  if (!contenedor) {
    return;
  }

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.forEach((producto) => {
    const tarjeta = document.createElement("div");

    tarjeta.className = "tarjeta";

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
    `;

    contenedor.appendChild(tarjeta);
  });
};

window.onload = () => {
  mostrarProductos();
  mostrarCarrito();
};