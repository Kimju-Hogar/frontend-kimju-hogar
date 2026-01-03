import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Initialize cart from localStorage if available
    const [cart, setCart] = useState(() => {
        try {
            const localCart = localStorage.getItem('cart');
            return localCart ? JSON.parse(localCart) : [];
        } catch (error) {
            console.error("Error parsing cart from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1, variation = null) => {
        setCart(prevCart => {
            // Check if item already exists with same ID and Variation
            const existingItemIndex = prevCart.findIndex(item =>
                item._id === product._id && item.selectedVariation === variation
            );

            if (existingItemIndex > -1) {
                // Update quantity
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                // Add new item
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
                // Optional: Check stock limit here if available in item data
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
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
