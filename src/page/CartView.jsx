import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'

const CartView = () => {
  const user = useSelector((state) => state.userState.user)
  const numItemInCart = useSelector((state) => state.cartState.numItemInCart)
  if (numItemInCart === 0) {
    return (
      <>
        <h1 className="text-3xl text-center font-bold">Belum ada isi Keranjang</h1>
      </>
    )
  }
  return (
    <>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">
          List Keranjang
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CartList />
          </div>
          <div className="lg:col-span-4 lg:pl-4">
            <CartTotal />
            {user ? (<Link to="/checkout" className='btn btn-primary btn-block mt-8'>CheckOut</Link>) : (<Link to="/login" className='btn btn-primary btn-block mt-8'>Please Login to Checkout</Link>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default CartView