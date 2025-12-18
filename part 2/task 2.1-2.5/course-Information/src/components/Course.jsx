import Content from './Content'
import Header from './Header'

const Course = ({ course }) => {
	const { parts, name } = course
	const total = parts.reduce((sum, part) => sum + part.exercises, 0)

	return (
		<div>
			<Header name={name} />
			<Content parts={parts} />
			<p>
				<strong>total of {total} exercises</strong>
			</p>
		</div>
	)
}
export default Course
