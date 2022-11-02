import React, { createContext, useState } from 'react';
import app from '../../firebase/firebase.config';
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const auth = getAuth(app);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const verifyEmail = () => {
		return sendEmailVerification(auth);
	};
	const loginUser = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};
	const providerLogin = (provider) => {
		return signInWithPopup(auth, provider);
	};
	const updateUserProfile = (profileData) => {
		return updateProfile(auth.currentUser, profileData);
	};

	const authInfo = {
		user,
		loading,
		createUser,
		verifyEmail,
		loginUser,
		providerLogin,
		updateUserProfile,
	};

	return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
