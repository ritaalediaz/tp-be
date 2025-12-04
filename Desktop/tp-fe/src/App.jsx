import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 🧩 Componentes
import Layout from './components/Layout';
import { PedidoProvider } from './context/PedidoContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // 👈 nuevo import

// 📄 Páginas
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PersonalizarPizza from './pages/PersonalizarPizza';
import PizzaCard from './pages/PizzaCard';
import PedidoCompleto from './pages/PedidoCompleto';
import CrudUsuarios from './pages/CrudUsuarios'; 
import IniciarSesion from "./pages/IniciarSesion";

// 🎨 Estilos
import './assets/style/home.css';
import './assets/style/contacto.css';
import './assets/style/aboutus.css';
import './assets/style/PizzaCard.css';
import './assets/style/Registro.css';
import './assets/style/header.css';
import './assets/style/footer.css';
import './App.css';

function App() {
  return (
    <PedidoProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/quienes-somos" element={<AboutUs />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/pizzas" element={<PizzaCard />} />
            <Route path="/personalizarpizzas" element={<PersonalizarPizza />} />
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />

            {/* Rutas protegidas */}
            <Route
              path="/pedido"
              element={
                <ProtectedRoute>
                  <PedidoCompleto />
                </ProtectedRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute>
                  <CrudUsuarios />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </PedidoProvider>
  );
}

export default App;
