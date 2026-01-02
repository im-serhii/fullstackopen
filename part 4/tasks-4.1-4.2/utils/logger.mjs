import {timeStamp} from "./timeStamp.mjs";

export const info = (...params) => {
	console.info(`(info) ${timeStamp()} > ${params}`)
}

export const error = (...params) => {
	console.error(`(error) ${timeStamp()} > ${params}`)
}
