import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Component/Home';
import AboutPage from './Component/About';
import NotesState from './Context/NotesState';
import Login from './Component/Login';
import Signup from './Component/Signup';

function App() {
  return (
    <div className="App">
      <NotesState>

        <BrowserRouter>
          <Navbar />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/about" element={<AboutPage />} />

          </Routes>
        </BrowserRouter>

      </NotesState>

    </div>
  );
}

export default App;
