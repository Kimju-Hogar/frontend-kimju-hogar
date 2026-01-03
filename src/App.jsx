import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import UserProfile from './pages/UserProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Layout & components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import PageTransition from './components/layout/PageTransition';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="flex flex-col min-h-screen bg-white text-secondary font-sans selection:bg-primary selection:text-black">
                        <Navbar />

                        <main className="flex-grow">
                            <PageTransition>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/shop" element={<Shop />} />
                                    <Route path="/product/:id" element={<ProductDetail />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/profile" element={<UserProfile />} />
                                    <Route path="/cart" element={<Cart />} />
                                    {/* Checkout will be protected or check if empty cart */}
                                    <Route path="/checkout" element={<Checkout />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/admin" element={<AdminDashboard />} />
                                    <Route path="*" element={<div className="p-20 text-center">Página no encontrada</div>} />
                                </Routes>
                            </PageTransition>
                        </main>

                        <WhatsAppButton />
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
