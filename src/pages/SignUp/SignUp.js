import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const SignUp = () => {
	const { createUser } = useContext(AuthContext);
	const [getUser, setGetUser] = useState({});
	const handleSubmit = (event) => {
		event.preventDefault();
        handleCreateUser(getUser.email,getUser.password)
	};
	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		const newGetUser = { ...getUser };
		newGetUser[name] = value;
		setGetUser(newGetUser);
	};

	const handleCreateUser = (email, password) => {
		createUser(email, password)
			.then((res) => {
				const user = res.user;
				console.log(user);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className='hero w-full my-20'>
			<div className='hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row'>
				<div className='text-center lg:text-left'>
					<img className='w-3/4' src={img} alt='' />
				</div>
				<div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20'>
					<h1 className='text-5xl text-center font-bold'>Sign Up</h1>
					<form onSubmit={handleSubmit} className='card-body'>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Name</span>
							</label>
							<input
								onChange={handleChange}
								type='text'
								name='name'
								placeholder='Your Name'
								className='input input-bordered'
							/>
						</div>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Email</span>
							</label>
							<input
								onChange={handleChange}
								type='text'
								name='email'
								placeholder='email'
								className='input input-bordered'
								required
							/>
						</div>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Password</span>
							</label>
							<input
								onChange={handleChange}
								type='text'
								name='password'
								placeholder='password'
								className='input input-bordered'
								required
							/>
						</div>
						<div className='form-control mt-6'>
							<input
								className='btn btn-primary'
								type='submit'
								value='Sign Up'
							/>
						</div>
					</form>
					<p className='text-center'>
						Already have an account?{' '}
						<Link className='text-orange-600 font-bold' to='/login'>
							Login
						</Link>{' '}
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
