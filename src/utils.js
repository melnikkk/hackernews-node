const jwt = require('jsonwebtoken');
const APP_SECRET = 'VERY_SECRET_KEY_:|';

const getTokenPayload = (token) => jwt.verify(token, APP_SECRET);

const getUserId = (req, authToken) => {
	if (req) {
		const authHeader = req.headers.authorization;

		if (authHeader) {
			const token = authHeader.replace('Bearer ', '');

			if (!token) {
				throw new Error('No token found :|');
			}

			const { userId } = getTokenPayload(token);

			return userId;
		}
	} else if (authToken) {
		const { userId } = getTokenPayload(authToken);

		return userId;
	}

	throw new Error('Not authenticated :(')
}

module.exports = {
	APP_SECRET,
	getUserId,
}