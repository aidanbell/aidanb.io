import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Nav />
      <main className="pt-14">
        <Home />
        <About />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default App;
