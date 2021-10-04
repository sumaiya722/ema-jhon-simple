import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);
    useEffect(() => {
        const savedCart = getStoredCart();
        for (const key in savedCart) {
            const addedProduct = products.find(product => product.key === key);
            console.log(key, addedProduct);
        }
    }, [])
    const handleAddToCart = (product) => {
        // const exists = cart.find(pd => pd.key === product.key);
        // let newCart = [];
        // if (exists) {
        //     const rest = cart.filter(pd => pd.key !== product.key);
        //     exists.quantity = exists.quantity + 1;
        //     newCart = [...rest, product];
        // }
        // else {
        //     product.quantity = 1;
        //     const newCart = [...cart, product];
        // }
        const newCart = [...cart, product];

        setCart(newCart);
        //save to localStorage (for now)
        addToDb(product.key);
    }
    const handleSearch = event => {
        const searchText = event.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        console.log(matchedProducts);
    }
    const handleToOrder = () => {
        history.push('/review');
    }
    return (
        <div>
            <div className="search-container">
                <input type="text"
                    onChange={handleSearch}
                    placeholder="Search-Product"
                />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        products.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <button onClick={handleToOrder} className="btn-regular">Remove</button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;