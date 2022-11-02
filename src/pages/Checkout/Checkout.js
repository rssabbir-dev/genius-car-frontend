import { stringify } from '@firebase/util';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Checkout = () => {
	const service = useLoaderData();
	const { user } = useContext(AuthContext);
    const { _id, title, description, img, price } = service;

	const handlePlaceOrder = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const phone = form.phone.value;

		const order = {
			service_id: _id,
			service_name: title,
			customer_name: name,
			customer_email: email,
			customer_phone: phone,
			customer_uid: user.uid,
			price,
			img,
		};

		fetch('http://localhost:5000/orders', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: stringify(order),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.acknowledged) {
					alert('Order Placed Successfully');
					form.reset();
				}
			});
	};
	return (
		<div className='hero min-h-screen'>
			<div className='hero-content grid grid-cols-2 gap-20'>
				<div className='text-center lg:text-left'>
					<img className='w-40' src={img} alt='' />
					<h1 className='text-4xl font-bold'>{title}</h1>
					<p className='py-6'>{description}</p>
				</div>
				<div className='card flex-shrink-0 w-full shadow-2xl bg-base-100'>
					<form onSubmit={handlePlaceOrder} className='card-body'>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Name</span>
							</label>
							<input
								name='name'
								type='text'
								placeholder='name'
								className='input input-bordered'
								defaultValue={user?.displayName}
							/>
						</div>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Email</span>
							</label>
							<input
								name='email'
								type='text'
								placeholder='email'
								className='input input-bordered'
								defaultValue={user?.email}
							/>
						</div>

						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Phone</span>
							</label>
							<input
								name='phone'
								type='text'
								placeholder='phone'
								className='input input-bordered'
							/>
						</div>
						<div className='form-control mt-6'>
							<button className='btn btn-primary'>
								Place Order
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
