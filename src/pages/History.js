import React, { useState } from 'react';
import HistoryProduct from '../components/HistoryProduct';

const Cart = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    
    const [customerData, setCustomerData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('/api/customers');
        const json = await response.json();

        if (response.ok) {
            setCustomerData(json);
        }
    }

    return (
        <div>
            <div className="history">
                <div className="customerHistory">
                    <form onSubmit={handleSubmit}>
                        <label>E-mail:</label>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email"/>
                        <label>Phone:</label>
                        <input onChange={(e) => setPhone(e.target.value)} required type="tel"/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
                <div className="productsHistory">
                    {
                        customerData &&
                            customerData.map((customer) => (
                                customer.email === email && customer.phone === phone ? (
                                    <>
                                        <div className="productsHistoryPurchase">
                                            <div key={customer._id} className="productsHistoryOrder">
                                                <div className="productsHistoryId">
                                                    <h3>Customer id: {customer._id}:</h3>
                                                </div>
                                                <div className="productsHistoryItem">
                                                    {
                                                        customer.order.map((item) => (
                                                            <HistoryProduct data={item} key={item._id}/>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="productsHistoryTotal">
                                                <h2>Total price: {customer.totalPrice}$</h2>
                                            </div>
                                        </div>
                                    </>
                                ) : null
                            ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;
