import React from 'react'
import customApi,{baseURL} from '../api'
import { Link, useLoaderData } from 'react-router-dom'
import Filter from '../components/Filter'
import CartProduct from '../components/CartProduct'
import Pagination from '../components/Pagination'
import { useSelector } from 'react-redux'
import axios from 'axios'

export const loader = async ({ request }) => {
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
  const url = '/product'

  const { data } = await axios.get(baseURL + url, { params: params })

  const products = data.data
  const pagination = data.pagination
  // console.log(params);
  // console.log(products);


  return { products, params, pagination }

}

const ProductView = () => {
  const user = useSelector((state) => state.userState.user)
  const { products, pagination } = useLoaderData()
  return (
    <>
      <Filter />
      {user && user.role === "Owner" && (
        <div className="flex justify-end">
          <Link to="/product/create" className='btn btn-secondary'>Tambah Produk</Link>
        </div>
      )}

      <h3 className="text-3lg text-primary font-bold text-right my-3">Total : {pagination.totalProduct} Produk</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {!products.length ? (
          <h1 className='text-3xl font-bold mt-5'>Tidak ada produk yang dicari</h1>
        ) : (products.map(item => (
          <CartProduct item={item} key={item._id} user={user} />
        )))
        }

      </div>
      <div className="mt-5 flex justify-center">
        <Pagination />

      </div>
    </>
  )
}

export default ProductView