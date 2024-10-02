import { createSlice } from '@reduxjs/toolkit'
import {toast} from 'react-toastify'

const initialState = {
    // menginisialisasi user yang ada di local storage, kalau tidak ada maka tampilkan null
    user: JSON.parse(localStorage.getItem('user') || null)
}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => { 
            const user = action.payload.data

            // set nilai dari state
            state.user = user

            // set localstorage
            localStorage.setItem('user', JSON.stringify(user))

        }, 
        logoutUser: (state)=>{
            state.user = null

            localStorage.removeItem('user')

            toast.success("Logout berhasil")
        },
        registerUser: (state, action) => {
            const user = action.payload.data

            // set nilai dari state
            state.user = user

            // set localstorage
            localStorage.setItem('user', JSON.stringify(user))
        }
    }
})

export const { loginUser, logoutUser, registerUser } = userReducer.actions

export default userReducer.reducer