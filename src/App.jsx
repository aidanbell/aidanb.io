import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import ScrollToHash from './components/ScrollToHash';
import HomePage from './pages/HomePage';

const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage'));

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Nav />
      <main className="pt-14">
        <Suspense
          fallback={
            <div className="px-6 py-20 text-sm text-neutral-500">Loading...</div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
