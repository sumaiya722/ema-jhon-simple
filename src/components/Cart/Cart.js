import React from 'react';
import './Cart.css';
const Cart = (props) => {
    console.log(props.children);
    const { cart } = props;
    // const handleRemove = props;
    let total = 0;
    for (const product of cart) {
        total = total + product.price;
    }
    const shipping = total > 0 ? 15 : 0;
    const tax = (total + shipping) * 0.10;
    const grandTotal = total + shipping + tax;
    return (
        <div>
            <h3>Order Summary:</h3>
            <h5>Items Order:{props.cart.length}</h5>
            <br />
            <p>Total:{total.toFixed(2)}</p>
            <p>Shipping:{shipping}</p>
            <p>Tax:{tax.toFixed(2)}</p>
            <p>GrandTotal:{grandTotal.toFixed(2)}</p>
            {/* <button onClick={handleRemove} className="btn-regular">Remove</button> */}
            {props.children}
        </div>
    );
};

export default Cart;