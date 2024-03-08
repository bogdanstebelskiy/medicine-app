import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";

const CartProduct = ({ data }) => {
    const { addToCart, removeFromCart } = useContext(ShopContext);

    return (
        <div className="card">
            <h2>{data.name}</h2>
            <p className="price">{data.price}$</p>
            <p className="quantity">Quantity: {data.quantity}</p>
            <p>
                <button onClick={() => addToCart(data)}>
                    +
                </button>
                <button onClick={() => removeFromCart(data)}>
                    -
                </button>
            </p>
        </div>
    );
};

export default CartProduct;
