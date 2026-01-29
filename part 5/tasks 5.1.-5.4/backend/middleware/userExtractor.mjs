import User from '../models/user.mjs'
import jwt from 'jsonwebtoken'
import { secret } from '../utils/config.mjs'

export const userExtractor = async (request, response, next) => {
	if (!request.token) {
		return next()
	}

	try {
		const decodedToken = jwt.verify(request.token, secret)

		if (decodedToken.id) {
			request.user = await User.findById(decodedToken.id)
		}
	} catch (error) {
		return next(error)
	}

	next()
}
