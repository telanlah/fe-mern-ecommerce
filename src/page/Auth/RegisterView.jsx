import React from "react"
import FormAuth from "../../components/FormAuth"
import { registerUser } from "../../features/userSlice"
import { toast } from "react-toastify"
import customAPI from "../../api"
import { redirect } from "react-router-dom"
import axios from "axios"


export const action = (store) => async ({ request }) => {

  const formInputData = await request.formData()
  const data = Object.fromEntries(formInputData)



  try {
    const response = await axios.post(customAPI.defaults.baseURL +'/auth/register', data)
    store.dispatch(registerUser(response.data))
    toast.success("Registrasi berhasil")
    return redirect("/")

  } catch (error) {
    const errorMessage = error?.response?.data?.message
    toast.error(errorMessage)
    return null

  }


}
const RegisterView = () => {
  return (
    <main>
      <FormAuth isRegister={true} />
    </main>
  )
}

export default RegisterView