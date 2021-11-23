import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculadora" element={<Calculator />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
