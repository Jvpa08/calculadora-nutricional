import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import { UserStorage } from "./UserContext";

import LoginCreate from "./components/loginComponents/LoginCreate";
import MyAccount from "./pages/MyAccount";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar" element={<LoginCreate />} />
          <Route path="/calculadora" element={<Calculator />} />
          <Route 
            path="/conta" 
            element={
              <PrivateRoute>
                <MyAccount />
              </PrivateRoute>
          } 
        />
        </Routes>
        <Footer />
      </UserStorage>
    </BrowserRouter>
  );
}


export default App;
