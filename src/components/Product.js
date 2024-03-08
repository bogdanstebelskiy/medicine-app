import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext"
import { FavoriteContext } from '../context/favoriteContext';

export const Product = ({ data }) => {
    const { cartItems, addToCart } = useContext(ShopContext);
    const { favorites, addToFavorites } = useContext(FavoriteContext);

    const cartItemAmount = cartItems[data._id];
    const isFavorite = favorites.includes(data._id);

    const favoriteButtonText = isFavorite ? "Delete from favorites" : "Add to favorites";

    const handleAddToCart = (data) => {
        addToCart(data); 
        alert('Product has been added to cart!');
    }

    const handleAddToFavorites = (data) => {
        addToFavorites(data._id);
    }

    return (
        <div className="card">
            <h2>{data.name}</h2>
            <p className="price">{data.price}$</p>
            <p>
                <button onClick={() => handleAddToCart(data) }>
                    Add to Cart {cartItemAmount > 0 && <> ({cartItemAmount}) </>}
                </button>
            </p>
            <p>
                <button onClick={() => handleAddToFavorites(data) }>
                    {favoriteButtonText}
                </button>
            </p>
        </div>
    )
}
