export const port = process.env.PORT || 3003
export const dbUrl = process.env.NODE_ENV === 'test'
	? process.env.MONGOURL_TEST_ENV
	: process.env.MONGOURL
