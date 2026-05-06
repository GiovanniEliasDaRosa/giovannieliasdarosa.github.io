import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Skills />
        <Projects />
      </main>
    </>
  );
}

export default App;
