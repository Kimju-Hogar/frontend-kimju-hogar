import { createContext, useState, useEffect, useContext, useRef } from 'react';
import api from '../config/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    const isFirstRun = useRef(true);
    const [isFetching, setIsFetching] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Initialize cart from localStorage ONLY if not authenticated yet
    const [cart, setCart] = useState(() => {
        try {
            const localCart = localStorage.getItem('cart');
            return localCart ? JSON.parse(localCart) : [];
        } catch (error) {
            console.error("Error parsing cart from localStorage", error);
            return [];
        }
    });

    // 1. Sync from Backend on Login / Initial Load
    useEffect(() => {
        const handleLogout = () => {
            setCart([]);
            localStorage.removeItem('cart');
        };

        window.addEventListener('auth:logout', handleLogout);

        const fetchAndMergeCart = async () => {
            if (isAuthenticated) {
                setIsFetching(true);
                try {
                    const token = localStorage.getItem('token');
                    // Use configured axios instance or base URL if possible
                    const { data: remoteCart } = await api.get('/users/cart');

                    // Logic: 
                    // If 'just_logged_in' is true -> this is a fresh login, so we MERGE guest cart with remote cart.
                    // If 'just_logged_in' is false -> this is a page reload, so we REPLACE local cart with remote cart (Source of Truth).

                    const isFreshLogin = sessionStorage.getItem('just_logged_in') === 'true';

                    if (isFreshLogin) {
                        sessionStorage.removeItem('just_logged_in'); // Consume the flag

                        setCart(prevCart => {
                            const guestCart = prevCart;
                            const formattedRemote = remoteCart.map(item => ({
                                ...item.product,
                                _id: item.product._id, // Ensure ID is flat
                                quantity: item.quantity,
                                selectedVariation: item.selectedVariation
                            }));

                            // Merge: Remote items take priority, but guest items are added if new OR quantities summed if existing
                            const merged = [...formattedRemote];

                            guestCart.forEach(guestItem => {
                                const existingItemIndex = merged.findIndex(ri =>
                                    ri._id === guestItem._id && ri.selectedVariation === guestItem.selectedVariation
                                );

                                if (existingItemIndex > -1) {
                                    // Item exists in both - SUM quantities
                                    merged[existingItemIndex].quantity += guestItem.quantity;
                                } else {
                                    // Item only in guest cart - Add it
                                    merged.push(guestItem);
                                }
                            });

                            return merged;
                        });
                    } else {
                        // Just a reload - Trust Backend
                        const formattedRemote = remoteCart.map(item => ({
                            ...item.product,
                            _id: item.product._id,
                            quantity: item.quantity,
                            selectedVariation: item.selectedVariation
                        }));
                        setCart(formattedRemote);
                    }
                } catch (error) {
                    console.error("Error fetching remote cart", error);
                } finally {
                    setIsFetching(false);
                    isFirstRun.current = false;
                }
            } else {
                isFirstRun.current = false;
            }
        };
        fetchAndMergeCart();

        return () => window.removeEventListener('auth:logout', handleLogout);
    }, [isAuthenticated]);

    // 2. Persist to Backend and LocalStorage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));

        const syncToBackend = async () => {
            // Only sync if authenticated, not currently fetching, AND not the very first run
            if (isAuthenticated && !isFetching && !isFirstRun.current) {
                try {
                    const token = localStorage.getItem('token');
                    const cartData = cart.map(item => ({
                        product: item._id,
                        quantity: item.quantity,
                        selectedVariation: item.selectedVariation
                    }));
                    await api.post('/users/cart', { cart: cartData });
                } catch (error) {
                    console.error("Error syncing cart to backend", error);
                }
            }
        };

        const timeoutId = setTimeout(syncToBackend, 1500); // 1.5s debounce to be safe
        return () => clearTimeout(timeoutId);
    }, [cart, isAuthenticated, isFetching]);

    const addToCart = (product, quantity = 1, variation = null) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(item =>
                item._id === product._id && item.selectedVariation === variation
            );

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                return [...prevCart, {
                    ...product,
                    quantity,
                    selectedVariation: variation
                }];
            }
        });
    };

    const removeFromCart = (productId, variation = null) => {
        setCart(prevCart => prevCart.filter(item =>
            !(item._id === productId && item.selectedVariation === variation)
        ));
    };

    const updateQuantity = (productId, variation, delta) => {
        setCart(prevCart => prevCart.map(item => {
            if (item._id === productId && item.selectedVariation === variation) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            const price = item.price - (item.price * (item.discount || 0) / 100);
            return total + (price * item.quantity);
        }, 0);
    };

    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};
