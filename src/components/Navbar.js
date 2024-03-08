import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Shop</h1>
                </Link>
                <Link to="/cart">
                    <h1>Shopping Cart</h1>
                </Link>
                <Link to="/history">
                    <h1>History</h1>
                </Link>
                <Link to="/coupons">
                    <h1>Coupons</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar;