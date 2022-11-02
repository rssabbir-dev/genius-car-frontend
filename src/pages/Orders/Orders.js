import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
	const { user } = useContext(AuthContext);
	const [orders, setOrders] = useState([]);
	const handleDelete = (product) => {
		const agree = window.confirm(
			`Are You Sure Delete ${product.service_name}`
		);
		if (agree) {
			fetch(`http://localhost:5000/orders/${product._id}`, {
				method: 'DELETE',
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.deletedCount > 0) {
						alert('Deleted Success');
						const left = orders.filter(
							(order) => order._id !== product._id
						);
						setOrders(left);
					}
				});
		}
	};

	const handleStatusUpdate = (id) => {
		fetch(`http://localhost:5000/orders/${id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({status:'Approved'}),
		})
			.then((res) => res.json())
			.then((data) => {
                console.log(data);
                if (data.modifiedCount) {
                    const left = orders.filter(order => order._id !== id);
                    const modified = orders.find(order => order._id === id);
                    modified.status = 'Approved'
                    const newOrders = [modified, ...left];
                    setOrders(newOrders)
                }
			});
	};

	useEffect(() => {
		const url = `http://localhost:5000/orders/?uid=${user?.uid}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setOrders(data));
	}, [user?.uid]);
	return (
		<div className='overflow-x-auto w-full'>
			<table className='table w-full'>
				<thead>
					<tr>
						<th></th>
						<th>Service Name</th>
						<th>Customer Name</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<OrderRow
							key={order._id}
							order={order}
							handleDelete={handleDelete}
							handleStatusUpdate={handleStatusUpdate}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Orders;
