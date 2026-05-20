import { createContext,useState,useEffect } from "react";
import {login,register,getMe} from "./services/auth.api.js"
export const AuthContext=createContext()

export function AuthProvider({children}){
  const [user,setUser]=useState(null)
  const [token,setToken]=useState(()=>localStorage.getItem("token") || "")

  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    if(token){
      localStorage.setItem("token",token)
      return
    }
    localStorage.removeItem("token")
  },[token])

  const handleLogin=async(username,password)=>{
    setLoading(true)
    try{
      const response=await login(username,password)
      setUser(response.user)
      setToken(response.token || "")
    }catch(err){
      console.log(err)
      throw err
    }
    finally{
      setLoading(false)
    }
  }

  const handleRegister=async(username,email,password)=>{
    setLoading(true)
    try{
      const response=await register(username,email,password)
      setUser(response.user)
      setToken(response.token || "")
    }catch(err){
      console.log(err)
      throw err
    }
    finally{
      setLoading(false)
    }

  }

  return(
    <AuthContext.Provider value={{user,token,loading,handleLogin,handleRegister}}>
      {children}
    </AuthContext.Provider>
  )




}