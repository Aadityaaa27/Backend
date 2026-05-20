import React from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  
  const {loading,handleRegister,token} = useAuth()

  const navigate=useNavigate()

async function handleSubmit(e){
  e.preventDefault()
  setError("")

  try{
    await handleRegister(username,email,password)
    navigate('/')
  }catch(err){
    setError(err?.response?.data?.message || "Registration failed")
  }

    
}

if(loading){
  return (<main><h1>Loading....</h1></main>)
}





  return (
    <main>
      <div className='form-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input 
          onChange={(e) =>{setUsername(e.target.value)}}
           type="text" name='username' placeholder='Enter Username' />
          <input 
          onChange={(e) =>{setEmail(e.target.value)}}
           type="email" name='email' placeholder='Enter Email' />

          <input 
          onChange={(e) =>{setPassword(e.target.value)}}
           type="password" name='password' placeholder='Enter Password' />
          <button type='submit'>Register</button>
        </form>

        <p>Already have an account? <Link className='toggleAuthForm' to='/login'>Login</Link></p>
        {error ? <p>{error}</p> : null}
      </div>
    </main>
  )
}

export default Register
