import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy load Pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const OrderFailure = lazy(() => import('./pages/OrderFailure'));
const OrderPending = lazy(() => import('./pages/OrderPending'));
const FAQ = lazy(() => import('./pages/FAQ'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Layout & components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import PageTransition from './components/layout/PageTransition';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import ScrollToTop from './components/layout/ScrollToTop';
import CartDrawer from './components/layout/CartDrawer';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { HelmetProvider } from 'react-helmet-async';

import { ToastProvider } from './context/ToastContext';

// Loading Component
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
);

function App() {
    return (
        <HelmetProvider>
            <ToastProvider>
                <AuthProvider>
                    <CartProvider>
                        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                            <ScrollToTop />
                            <CartDrawer />
                            <div className="flex flex-col min-h-screen text-secondary font-sans selection:bg-primary selection:text-black">
                                <Navbar />

                                <main className="flex-grow">
                                    <Suspense fallback={<PageLoader />}>
                                        <PageTransition>
                                            <Routes>
                                                <Route path="/" element={<Home />} />
                                                <Route path="/shop" element={<Shop />} />
                                                <Route path="/product/:id" element={<ProductDetail />} />
                                                <Route path="/login" element={<Login />} />
                                                <Route path="/register" element={<Register />} />
                                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                                <Route path="/reset-password/:token" element={<ResetPassword />} />
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
                                                <Route element={<AdminRoute />}>
                                                    <Route path="/admin" element={<AdminDashboard />} />
                                                </Route>

                                                <Route path="/faq" element={<FAQ />} />
                                                <Route path="*" element={<NotFound />} />
                                            </Routes>
                                        </PageTransition>
                                    </Suspense>
                                </main>

                                <WhatsAppButton />
                                <Footer />
                            </div>
                        </Router>
                    </CartProvider>
                </AuthProvider>
            </ToastProvider>
        </HelmetProvider>
    );
}

export default App;
