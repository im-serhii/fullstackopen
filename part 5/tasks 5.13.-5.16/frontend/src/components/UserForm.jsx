import { useState } from 'react'

const UserForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = e => {
    e.preventDefault()

    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>log in to application</h1>
      <label>
        username{' '}
        <input value={username} onChange={({ target }) => setUsername(target.value)} type='text' />
      </label>
      <br />
      <label>
        password{' '}
        <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <br />
      <input value='login' type='submit' />
    </form>
  )
}
export default UserForm
