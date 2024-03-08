import React, { createContext, useState } from 'react';

export const FavoriteContext = createContext(null);

export const FavoriteContextProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (productId) => {
        setFavorites(prevFavorites => {
            if (prevFavorites.includes(productId)) {
                return prevFavorites.filter(id => id !== productId);
            } else {
                return [...prevFavorites, productId];
            }
        });
    };

    const contextValue = { favorites, addToFavorites };

    return (
        <FavoriteContext.Provider 
            value={ contextValue }>
                {children}
        </FavoriteContext.Provider>
    );
};
