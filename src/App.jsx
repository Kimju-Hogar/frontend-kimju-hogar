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
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import OrderSuccess from './pages/OrderSuccess';
import OrderFailure from './pages/OrderFailure';
import OrderPending from './pages/OrderPending';

// Layout & components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import PageTransition from './components/layout/PageTransition';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ScrollToTop from './components/layout/ScrollToTop';
import CartDrawer from './components/layout/CartDrawer';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { HelmetProvider } from 'react-helmet-async';

function App() {
    return (
        <HelmetProvider>
            <AuthProvider>
                <CartProvider>
                    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                        <ScrollToTop />
                        <CartDrawer />
                        <div className="flex flex-col min-h-screen text-secondary font-sans selection:bg-primary selection:text-black">
                            <Navbar />

                            <main className="flex-grow">
                                <PageTransition>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/shop" element={<Shop />} />
                                        <Route path="/product/:id" element={<ProductDetail />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/register" element={<Register />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="/terms" element={<Terms />} />
                                        <Route path="/privacy" element={<Privacy />} />

                                        {/* Protected Routes */}
                                        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                                        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                                        <Route path="/order/:id/success" element={<OrderSuccess />} />
                                        <Route path="/order/:id/failure" element={<OrderFailure />} />
                                        <Route path="/order/:id/pending" element={<OrderPending />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

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
        </HelmetProvider>
    );
}

export default App;
