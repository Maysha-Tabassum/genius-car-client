import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('https://genius-car-server-roan-six.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                 authorization: `Bearer ${localStorage.getItem('genius-token')}`
                },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                alert('Order Placed Successfully')
                form.reset();
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <div className="m-6 p-5 text-center bg-orange-100">
            <h2 className='text-4xl pt-3'>You are about to order: {title}</h2>
            <h3 className='text-3xl'>price: {price}</h3>
            <form onSubmit={handlePlaceOrder} className='my-3'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <input name="firstName" type="text" placeholder="First Name" className="input input-ghost input-bordered w-full" />
                    <input name="lastName" type="text" placeholder="Last Name" className="input input-ghost input-bordered w-full " />
                    <input name="phone" type="number" placeholder="Your Phone" className="input input-ghost input-bordered w-full " />
                    <input name="email" type="email" placeholder="Your Email" defaultValue={user?.email} className="input input-ghost input-bordered w-full " readOnly />
                </div>
                <div>
                    <textarea name="message" className='textarea textarea-border h-24 w-3/4  m-5' placeholder="Your message"></textarea>
                    <p><input className='btn text-center' type="submit" value="Place Your Order" /></p>
                </div>
            </form>
        </div>
    );
};

export default Checkout;