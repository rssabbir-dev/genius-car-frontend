import React from 'react';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
	const {
		customer_name,
		img,
		customer_phone,
		service_name,
		price,
		status,
		_id,
	} = order;

	return (
		<tr>
			<th>
				<button
					onClick={() => handleDelete(order)}
					className='btn btn-circle btn-outline'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</button>
			</th>
			<td>
				<div className='flex items-center space-x-3'>
					<div className='avatar'>
						<div className='rounded w-12 h-12'>
							<img
								src={img}
								alt='Avatar Tailwind CSS Component'
							/>
						</div>
					</div>
					<div>
						<div className='font-bold'>{service_name}</div>
						<div className='text-sm opacity-50'>${price}</div>
					</div>
				</div>
			</td>
			<td>
				{customer_name}
				<br />
				<span className='badge badge-ghost badge-sm'>
					{customer_phone}
				</span>
			</td>
			<th>
				<button
					onClick={() => handleStatusUpdate(_id)}
					className='btn btn-ghost btn-xs'
				>
					{status ? status : 'pending'}
				</button>
			</th>
		</tr>
	);
};

export default OrderRow;
