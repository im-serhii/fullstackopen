import './style.css'
const Notification = ({ type, data }) => {
  let text = ''
  if (type === null) return

  if (type === 'success') {
    text = `${data} added`
  } else if (type === 'error') {
    text = 'username or password are incorrect'
  }

  return (
    <div className={`notification ${type}`}>
      {text}
    </div>
  )
}
export default Notification
