import React from "react";

const HistoryProduct = ({ data }) => {
    return (
        <div className="card">
            <h2>{data.name}</h2>
            <p className="price">{data.price}$</p>
            <p className="quantity">Quantity: {data.quantity}</p>
        </div>
    );
};

export default HistoryProduct;