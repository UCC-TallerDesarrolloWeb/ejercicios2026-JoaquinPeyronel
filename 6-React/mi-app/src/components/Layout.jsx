
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
    <div className="layout">
      <Header
        logueado={logueado}
        cerrarSesion={cerrarSesion}
      />

      <main className="layout-main">
        <Outlet context={{ logueado, iniciarSesion }} />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
