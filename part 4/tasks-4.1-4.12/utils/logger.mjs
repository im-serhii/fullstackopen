import {timeStamp} from "./timeStamp.mjs";

export const info = (...params) => {
	if(process.env.NODE_ENV !== 'test') {
		console.info(`(info) ${timeStamp()} > ${params}`)
	}
}

export const error = (...params) => {
	console.error(`(error) ${timeStamp()} > ${params}`)
}
