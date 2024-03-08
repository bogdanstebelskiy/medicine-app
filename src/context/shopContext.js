import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = async (pickedShop) => {
    let cart = {};

    if (!pickedShop) return cart;

    const response = await fetch(`/api/shops/${pickedShop._id}`);
    //const shopData = await response.json();

    if (!response.ok) return cart;

    return cart;
}

export const ShopContextProvider = ({ pickedShop, setPickedShop, children }) => {
    const [cartItems, setCartItems] = useState();

    useEffect(() => {
        const initializeCart = async () => {
            const cart = await getDefaultCart(pickedShop);
            setCartItems(cart);
        };

        initializeCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addToCart = (item) => {
        setCartItems((prev) => {
            if (prev[item._id]) {
                return { ...prev, [item._id]: { ...item, quantity: prev[item._id].quantity + 1 } };
            } else {
                return { ...prev, [item._id]: { ...item, quantity: 1 } };
            }
        });
    }
    
    const removeFromCart = (item) => {
        setCartItems((prev) => {
            const newQuantity = prev[item._id]?.quantity - 1 || 0;
            if (newQuantity <= 0) {
                const { [item._id]: _, ...rest } = prev;
                return rest;
            } else {
                return {...prev, [item._id]: { ...item, quantity: newQuantity } };
            }
        });
    };

    const contextValue = { cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider 
            value={contextValue}>
                {children}
        </ShopContext.Provider>
    )
}
