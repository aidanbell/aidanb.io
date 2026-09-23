import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import ScrollToHash from "./components/ScrollToHash";
import TechnicalHome from "./pages/TechnicalHome";

const PlaygroundPage = lazy(() => import("./pages/PlaygroundPage"));

function Layout() {
  return (
    <>
      <ScrollToHash />
      <Nav />
      <main className="pt-14">
        <Suspense fallback={<div className="px-2 py-16 text-sm text-neutral-500">Loading...</div>}>
          <Routes>
            <Route path="/" element={<TechnicalHome />} />
            <Route path="/schema-form" element={<PlaygroundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
