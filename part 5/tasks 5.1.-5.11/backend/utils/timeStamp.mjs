import { Temporal } from '@js-temporal/polyfill';

export const timeStamp = () => {
	const now = Temporal.Now.zonedDateTimeISO();

	const dayName = now.toLocaleString('en-US', {weekday: 'long',})
	const monthName = now.toLocaleString('en-US', {month: 'long',})

	return `${now.hour}:${now.minute}:${now.second} | ${dayName} ${now.day} ${monthName} ${now.year}`
}
