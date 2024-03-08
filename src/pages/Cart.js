import React, { useContext, useState, useMemo } from 'react';
import { ShopContext } from '../context/shopContext';
import CartProduct from '../components/CartProduct';
import Map from '../components/Map';

const Cart = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        coupon: '',
    });
    
    const [discount, setDiscount] = useState(0);
    const [couponUsed, setCouponUsed] = useState(false);

    const { cartItems } = useContext(ShopContext);

    const items = useMemo(() => cartItems || {}, [cartItems]);

    const totalPrice = useMemo(() => {
        let newTotalPrice = Object.values(items).reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        
        if (couponUsed) {
            newTotalPrice -= newTotalPrice * (discount / 100);
        }
    
        return Math.max(0, newTotalPrice);
    }, [items, discount, couponUsed]);

    const orderItems = useMemo(() => {
        return Object.keys(items).map((itemId) => ({
            _id: itemId,
            name: items[itemId].name,
            price: items[itemId].price,
            quantity: items[itemId].quantity,
        }));
    }, [items]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, address } = formData;

        if (!name || !email || !phone || !address) {
            alert('Invalid input data!');
            return;
        }

        if (Object.keys(items).length === 0) {
            alert('Empty cart!');
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, address, totalPrice, order: orderItems })
        };
        const response = await fetch('/api/customers', requestOptions);

        if (!response.ok) {
            console.log("Error! Couldn't fetch post request to /api/customers!");
        }

        alert('Purchase is successful!');
        window.location.reload();
    };

    const handleCoupon = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/coupons');
        const result = await response.json();

        if (!response.ok) {
            console.log("Error! Couldn't fetch get request to /api/coupons!");
        } else {
            const { coupon } = formData;
            result.forEach((e) => {
                if (e.code === coupon && !couponUsed) {
                    setDiscount(e.discount);
                    setCouponUsed(true);
                }
            })
        }
    };

    return (
        <div>
            <div className="cart">
                <div className="customer">
                    <div>
                        <Map />
                    </div>
                    <div>
                        <form>
                            <label>Name:</label>
                            <input name="name" value={formData.name} onChange={handleChange} required />
                            <label>E-mail:</label>
                            <input name="email" value={formData.email} onChange={handleChange} required type="email" />
                            <label>Phone:</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" />
                            <label>Address:</label>
                            <input name="address" value={formData.address} onChange={handleChange} required />
                            <br />
                            <label>Coupon:</label>
                            <input name="coupon" value={formData.coupon} onChange={handleChange} />
                            <button onClick={handleCoupon}>Apply coupon</button>
                            <br />
                        </form>
                        <form onSubmit={handleSubmit}>
                            <p>Total price: {totalPrice}$</p>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
                <div className="products">
                    {Object.keys(items).map((id) => (
                        <CartProduct data={items[id]} key={id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cart;
