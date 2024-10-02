import React from 'react'
import CartTotal from './CartTotal'
import FormInput from './form/FormInput'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import customApi from '../api'
import { toast } from "react-toastify";
import { clearCartItem } from '../features/cartSlice';
import { useNavigate, redirect } from 'react-router-dom'

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute("data-client-key", import.meta.env.midtrans_clientKey)
    script.onload = () => resolve()

    document.body.appendChild(script)
  })
}

export const loader = (storage) => () => {
  const user = storage.getState().userState.user
  if (!user) {
    toast.warn("Login untuk mengakses halaman ini")
    return redirect('/login')
  }
  return null
}

const CheckOutView = () => {
  const user = useSelector((state) => state.userState.user)
  const cart = useSelector((state) => state.cartState.CartItems)

  const navigate = useNavigate()
  const dispatch = useDispatch()



  useEffect(() => {
    insertSnapScript()
  }, [])

  const handleCheckout = async (e) => {
    //agar tidak reload halaman
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)

    const data = Object.fromEntries(formData)

    const newArrayKeranjang = cart.map((item) => {
      return {
        product: item.productId,
        quantity: item.amount,


      }
    })
    try {
      const response = await customApi.post("/order", {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        cartItem: newArrayKeranjang,

      })

      const snapToken = response.data.token

      // SnapToken acquired from previous step
      window.snap.pay(snapToken.token, {
        // Optional
        onSuccess: function (result) {
          console.log(result);
          dispatch(clearCartItem())
          navigate("/orders")
          alert("Berhasil")

        },
        // Optional
        onPending: function (result) {
          console.log(result);
          alert("Pending")
        },
        // Optional
        onError: function (result) {
          console.log(result)
          alert("Error")
        }
      });
      toast.success("berhasil order")

    } catch (error) {
      const errorMessage = error?.response?.data?.message
      toast.error(errorMessage)

    }


  }


  return (
    <>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">
          Checkout Product
        </h2>
      </div>
      <div className="mt-8 grid gap-y-8 gap-x-2 lg:grid-cols-12">
        {/* form input */}
        <div className="lg:col-span-8">
          <form method='post' className='bg-base-300 rounded-2xl grid grid-y-2 p-5 items-center' onSubmit={handleCheckout}>
            <div className="grid grid-cols-2 gap-x-4">
              <FormInput label="First name" type="name" name="firstName" />
              <FormInput label="Lasst name" type="name" name="lastName" />
            </div>

            <FormInput label="Email" type="email" name="email" defaultValue={user.email} />
            <FormInput label="Phone" type="name" name="phone" />
            <button type='submit' className="btn btn-primary mt-5">Bayar</button>

          </form>
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
        </div>
      </div>
    </>
  )
}

export default CheckOutView