import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import NavList from './NavList'
import { BsCart3 } from 'react-icons/bs'
import { FaBarsStaggered } from 'react-icons/fa6'
import { useSelector, useDispatch } from 'react-redux'
import customAPI from '../api'
import { logoutUser } from '../features/userSlice'
import { clearCartItem } from '../features/cartSlice'
import axios from 'axios'

const Nav = () => {
    const user = useSelector((state) => state.userState.user)
    const countIntCart = useSelector((state) => state.cartState.numItemInCart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlingLogout = async () => {
        try {
            await axios.get(customAPI.defaults.baseURL +'/auth/logout')
            // menghapus cookies
            dispatch(logoutUser())
            dispatch(clearCartItem())
            navigate('/')
        } catch (error) {
            dispatch(logoutUser())
            dispatch(clearCartItem())
            navigate('/')
        }


    }
    return (
        <nav className='bg-base-200'>
            <div className="navbar mx-auto max-w-6xl px-8">
                <div className="navbar-start">
                    <NavLink to='/' className="hidden lg:flex btn btn-primary text-3xl items-center">
                        LOGO
                    </NavLink>
                    {/* Mobile Device */}
                    <div className="dropdown">
                        <label tabIndex={0} className='btn btn-ghost lg:hidden'>
                            <FaBarsStaggered className='h-6 w-6' />
                        </label>
                        <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'>
                            <NavList />
                        </ul>
                    </div>
                    {/* PC Device */}
                    <div className="hidden lg:flex">
                        <ul className='menu menu-horizontal'>
                            <NavList />
                        </ul>
                    </div>
                </div>
                <div className="navbar-end">
                    <NavLink to="/carts" className="btn btn-ghost btn-circle btn-md">
                        <div className="indicator">
                            <BsCart3 size={22} />
                            <span className="badge badge-primary badge-sm indicator-item">
                                {countIntCart}
                            </span>
                        </div>
                    </NavLink>
                    {user && (<button className='btn btn-error btn-outline btn-md' onClick={handlingLogout}> Logout</button>)}
                </div>
            </div>
        </nav>
    )
}

export default Nav