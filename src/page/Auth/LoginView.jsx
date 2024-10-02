import React from "react"
import FormAuth from "../../components/FormAuth"
import customAPI from "../../api"
import { toast } from "react-toastify"
import { redirect } from "react-router-dom"
import { loginUser } from "../../features/userSlice"
import axios from "axios"

export const action = (store) => async({request}) =>{
  const formInputData = await request.formData()
  const data = Object.fromEntries(formInputData)

  try {
    const response = await axios.post(customAPI.defaults.baseURL +'/auth/login',data)
    store.dispatch(loginUser(response.data))
    toast.success("Login berhasil")
    return redirect("/")
    
  } catch (error) {
    const errorMessage = error?.response?.data?.message
    toast.error(errorMessage)
    return null
    
  }
  
  //agar tidak mengarah ke halaman lainnya
  return null
} 
const LoginView = () => {

  return (
    <main>
      <FormAuth/>
    </main>
  )
}

export default LoginView