import {timeStamp} from "./timeStamp.mjs";

export const Info = (...params) => {
	if(process.env.NODE_ENV !== 'test') {
		console.info(`(info) ${timeStamp()} > ${params}`)
	}
}

export const Error = (...params) => {
	console.error(`(error) ${timeStamp()} > ${params}`)
}
