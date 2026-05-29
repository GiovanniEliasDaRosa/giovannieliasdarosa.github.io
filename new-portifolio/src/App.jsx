import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <ThemeProvider>
        <Header />

        <main>
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
