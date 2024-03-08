import { useEffect, useState, useContext, useCallback } from 'react';
import { Product } from '../components/Product';
import { FavoriteContext } from '../context/favoriteContext';

const Home = ({ pickedShop, setPickedShop }) => {
    const [shops, setShops] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const { favorites } = useContext(FavoriteContext);
    const [isLoading, setIsLoading] = useState(true);

    const handleShopPick = useCallback((shop) => {
        setPickedShop(shop);
    }, [setPickedShop]);

    useEffect(() => {
        const fetchShops = async () => {
            const response = await fetch('/api/shops');
            const json = await response.json();
            
            if (response.ok) {
                setShops(json);
                if (json.length > 0) {
                    handleShopPick(json[0]);
                }
                setIsLoading(false);
            }
        };
        
        fetchShops();
    }, [handleShopPick]);

    const handleSortChange = (criteria) => {
        if (sortBy === criteria) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(criteria);
            setSortDirection('asc');
        }
    };

    const getSortButtonText = (criteria) => {
        if (sortBy === criteria) {
            return `Sort ${sortDirection === 'asc' ? 'Descending' : 'Ascending'}`;
        }
        return `Sort by ${criteria}`;
    };

    const sortedProducts = pickedShop && pickedShop.products.slice().sort((a, b) => {
        const isAFavorite = favorites.includes(a._id);
        const isBFavorite = favorites.includes(b._id);

        if (isAFavorite && !isBFavorite) {
            return -1;
        } else if (!isAFavorite && isBFavorite) {
            return 1;
        } else if (sortBy === 'price') {
            return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortBy === 'dateAdded') {
            const dateA = new Date(a.dateAdded);
            const dateB = new Date(b.dateAdded);
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        }
        return 0;
    });

    return (
        <div className="home">
            <div className="shops">
                <div><p>Shops:</p></div>
                {isLoading && <div>Loading shops...</div>}
                {!isLoading && shops &&
                    shops.map((shop) => (
                        <button
                            key={shop._id}
                            onClick={() => handleShopPick(shop)}
                        >
                            {shop.name}
                        </button>
                    ))
                }
                <div className="sortOptions">
                    <p>Sort by:</p>
                    <button onClick={() => handleSortChange('price')}>{getSortButtonText('price')}</button>
                    <button onClick={() => handleSortChange('dateAdded')}>{getSortButtonText('dateAdded')}</button>
                </div>
            </div>
            <div className="products">
                {isLoading && <div>Loading products...</div>}
                {!isLoading && sortedProducts &&
                    sortedProducts.map((product) => (
                        <Product data={product} key={product._id} />
                    ))
                }
            </div>
        </div>
    );
};

export default Home;
