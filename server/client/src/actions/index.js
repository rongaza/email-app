import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
	const response = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: response.data });
};

export const handleToken = token => {
	return async dispatch => {
		// in order to get the token into reqquest.body
		//of '/api/stripe' node will need a module called body-parser
		const response = await axios.post('/api/stripe', token);

		dispatch({ type: FETCH_USER, payload: response.data });
	};
};
