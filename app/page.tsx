
import Image from "next/image";
import SalesApp from "@/components/SalesApp";

export default function Home() {
  return (
    <main className="container">
      <header className="top">
        <div className="brand">
          <Image
            src="/logo.png"
            alt="SatCore Solutions"
            width={200}
            height={65}
            className="brand-logo"
            priority
          />

          <div>
            <div className="brand-tagline">
              Soluciones digitales seguras, accesibles y funcionales para todos.
            </div>
          </div>
        </div>

        <div className="top-content">
          <h1>Control de ventas</h1>
          <p className="muted">
            Registra tus ventas del día y consulta cómo va tu negocio.
          </p>
        </div>
      </header>

      <SalesApp />
    </main>
  );
}
