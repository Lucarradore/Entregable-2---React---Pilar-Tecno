import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import SeccionHero from "./components/Seccion Hero/SeccionHero";

const enlacesNavegacion = [
  { texto: "Inicio", href: "#inicio" },
  { texto: "Cursos", href: "#cursos" },
  { texto: "Contacto", href: "#contacto" },
];

function App() {
  return (
    <>
      <BarraNavegacion
        marca="Pilar Tecno"
        enlaces={enlacesNavegacion}
      />

      <SeccionHero
        titulo="Pilar Tecno"
        subtitulo="Bienvenido al curso de React"
        mensaje="Próximamente: cursos"
      />
    </>
  );
}

export default App;
