import Part from './Part'

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map(course => (
				<Part
					key={course.id}
					name={course.name}
					exercises={course.exercises}
				/>
			))}
		</div>
	)
}

export default Content
