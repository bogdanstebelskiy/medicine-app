import { useEffect, useState } from 'react';

const Coupons = () => {
    const [coupons, setCoupons] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await fetch('/api/coupons');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const json = await response.json();
                setCoupons(json);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCoupons();
    }, []);

    const handleCopyClick = async (code) => {
        try {
            await navigator.clipboard.writeText(code);
            alert('Copied to the clipboard!');
        } catch (error) {
            console.error('Error copying to clipboard:', error);
        }
    };

    return (
        <div className="coupons">
            {isLoading && <div>Loading coupons...</div>}
            {!isLoading && coupons && coupons.map((coupon) => (
                <div className="couponCard" key={coupon._id}>
                    <h2>{coupon.name}</h2>
                    <p className="code" id="code">Code: {coupon.code}</p>
                    <p className="price">-{coupon.discount}%</p>
                    <p><button onClick={() => handleCopyClick(coupon.code)}>Copy</button></p>
                </div>
            ))}
        </div>
    );
};

export default Coupons;
