import Content from './Content'
import Header from './Header'

const Course = ({ course }) => {
	const { parts } = course

	return (
		<div>
			<Header course={course.name} />
			<Content parts={parts} />
		</div>
	)
}
export default Course
