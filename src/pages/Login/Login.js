import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || '/';
	const { loginUser } = useContext(AuthContext);
	const [getUser, setGetUser] = useState({});
	const handleLogin = (event) => {
		event.preventDefault();
		console.log(getUser);
		handleUserLogin(getUser.email, getUser.password);
	};

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		const newGetUser = { ...getUser };
		newGetUser[name] = value;
		setGetUser(newGetUser);
	};

	const handleUserLogin = (email, password) => {
		loginUser(email, password)
			.then((res) => {
				const user = res.user;
				console.log(user);
				navigate(from, { replace: true });
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
					<h1 className='text-5xl text-center font-bold'>Login</h1>
					<form onSubmit={handleLogin} className='card-body'>
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
							/>
							<label className='label'>
								<a
									href='#'
									className='label-text-alt link link-hover'
								>
									Forgot password?
								</a>
							</label>
						</div>
						<div className='form-control mt-6'>
							<input
								className='btn btn-primary'
								type='submit'
								value='Login'
							/>
						</div>
					</form>
					<p className='text-center'>
						New to Genius Car{' '}
						<Link
							className='text-orange-600 font-bold'
							to='/signup'
						>
							Sign Up
						</Link>{' '}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
