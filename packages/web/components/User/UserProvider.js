import React, { useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as auth from '../../services/auth';
import UserContext from './UserContext';

const userReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_USER':
			return { ...state, ...payload.user };
		case 'LOGOUT_USER':
			return {};
		default:
			throw new Error('Invalid action');
	}
};

export const UserProvider = ({ children, user }) => {
	const [state, dispatch] = useReducer(userReducer, user);

	const getMe = useCallback(async (jwtToken) => {
		const result = await auth.getMe(jwtToken);

		if (!result) {
			return false;
		}

		dispatch({
			type: 'SET_USER',
			payload: {
				user: result,
			},
		});

		return true;
	}, []);

	const login = async (email, password) => {
		const jwt = await auth.login(email, password);
		if (jwt.token) {
			await getMe(jwt.token);
		}
		return jwt;
	};

	const logout = () => {
		auth.logout();
		dispatch({
			type: 'LOGOUT_USER',
		});
	};

	const register = async ({ fullname, email, password }) => {
		try {
			return auth.register(fullname, email, password);
		} catch (exception) {
			return false;
		}
	};

	return (
		<UserContext.Provider value={{ user: state, login, logout, register }}>
			{children}
		</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
	user: PropTypes.shape({}),
};

UserProvider.defaultProps = {
	user: {},
};

export default UserProvider;
