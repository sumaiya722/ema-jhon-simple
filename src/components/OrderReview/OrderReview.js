import React from 'react';
import { useHistory } from 'react-router';
import useCart from '../../Hook/useCart';
import useProducts from '../../Hook/useProducts';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';

const OrderReview = () => {
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart(products);
    const history = useHistory();
    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key);
    }
    const handlePlaceOrder = () => {
        history.push('/placeorder');
        setCart([]);
        clearTheCart()
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItems product={product}
                        key={product.key}
                        handleRemove={handleRemove}
                    ></ReviewItems>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="btn-regular">Place Order</button>
                </Cart>
            </div>
            {/* <h2>This is Order Review </h2>
            <h1>{products.length}</h1>
            <h3>{cart.length}</h3>
            <Cart cart={cart}></Cart> */}
        </div>
    );
};

export default OrderReview;