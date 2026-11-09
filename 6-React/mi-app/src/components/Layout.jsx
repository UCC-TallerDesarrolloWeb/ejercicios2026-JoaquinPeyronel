
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "@/styles/Layout.scss";

function Layout() {
  const [logueado, setLogueado] = useState(false);

  const iniciarSesion = () => {
    setLogueado(true);
  };

  const cerrarSesion = () => {
    setLogueado(false);
  };

  return (
    <>
      <Header
        logueado={logueado}
        cerrarSesion={cerrarSesion}
      />

      <Outlet
        context={{
          logueado,
          iniciarSesion,
          cerrarSesion,
        }}
      />

      <Footer />
    </>
  );
}

export default Layout;
