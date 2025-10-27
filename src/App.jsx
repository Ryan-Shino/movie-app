import "./css/App.css";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home"
import WatchLater from "./pages/Watch_Later";
import {Routes, Route} from "react-router-dom"
import { MovieProvider } from "./contexts/MovieContext";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";

function App() {
  return (
    <MovieProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/favourites" element={<Favourites />}/>
          <Route path="/watch-later" element={<WatchLater/>}/>
          <Route path="/search" element={<Search/>}/>
        </Routes>
      </main>
    </MovieProvider>
  );
}
export default App;
