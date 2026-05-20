import React,{useState} from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const{handleLogin,token}=useAuth()

  async function handleSubmit(e){
    e.preventDefault()
    setError("")
    try{
      await handleLogin(username,password)
    }catch(err){
      setError(err?.response?.data?.message || "Login failed")
    }
  }
  return (
   <main>
      <div className='form-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
          onInput={(e)=>{setUsername(e.target.value)}}
          type="text"  name='username' placeholder='Enter Username' />
          <input
          onInput={(e)=>{setPassword(e.target.value)}}
          type="password" name='password' placeholder='Enter Password' />
          <button type='submit'>Login</button>
        </form>
        <p>Don't have an account? <Link  className='toggleAuthForm' to='/register'>Register</Link></p>
        {error ? <p>{error}</p> : null}
      </div>
   </main>
  )
}

export default Login
