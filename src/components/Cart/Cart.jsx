import React, { Children } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Cart = ({cart,handleClearCart,children}) => {
    // console.log(cart)
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for(const product of cart){
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping =totalShipping + product.shipping * product.quantity;
        quantity = quantity + product.quantity;
    }
    const tax = (totalPrice * 10) / 100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
        <div className='bg-orange-200 rounded-md p-4 sticky top-6'>
            <h1 className='text-center text-3xl font-bold my-6'>Order Summary</h1>
            <p className='text-xl'>Selected Item:{quantity}</p>
            <p className='text-xl my-3'>Total Price:{totalPrice.toFixed(2)}</p>
            <p className='text-xl'>Total Shipping:{totalShipping.toFixed(2)}</p>
            <p className='text-xl my-3'>Tax:{tax}</p>
            <h5 className='text-2xl font-bold my-12'>Grand Total:{grandTotal.toFixed(2)}</h5>
            <button onClick={handleClearCart} className='bg-red-600 w-10/12 rounded-lg mx-auto flex justify-between items-center p-3 text-white font-bold'>
                <span>Clear Cart</span> <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            {children}

        </div>
    );
};

export default Cart;