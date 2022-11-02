import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const auth = getAuth(app);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const verifyEmail = () => {
		return sendEmailVerification(auth);
	};
	const loginUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};
	const providerLogin = (provider) => {
		setLoading(true);
		return signInWithPopup(auth, provider);
	};
	const updateUserProfile = (profileData) => {
		return updateProfile(auth.currentUser, profileData);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return () => unsubscribe();
	}, [auth]);

	const authInfo = {
		user,
		loading,
		createUser,
		verifyEmail,
		loginUser,
		providerLogin,
		updateUserProfile,
		logOut,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
