import { useState, useEffect } from 'react'
import { useParams, useNavigate, redirect } from 'react-router-dom'
import customAPI from '../api'
import Loading from '../components/Loading'
import FormSelect from '../components/form/FormSelect'
import FormInput from '../components/form/FormInput'
import FormTextarea from '../components/form/FormTextarea'
import { toast } from "react-toastify";
import axios from 'axios'

export const loader = (store) => async () => {
  const user = store.getState().userState.user
  if (!user) {
      toast.warn("Anda harus login dahulu")
      return redirect('/login')
  }
  else if (user.role !== "Owner") {
      toast.warn("Anda tidak dapat mengakses halaman ini")
      return redirect('/')
  }
  return null
}


const EditProductView = () => {
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  const categories = ['sepatu', 'baju', 'kemeja', 'celana']
  const navigate = useNavigate()
  const getProductId = async () => {
    const { data } = await axios.get(customAPI.defaults.baseURL + '/product/' + id)
    setProduct(data.data)

  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const dataForm = new FormData(form)

    const data = Object.fromEntries(dataForm)
    console.log(data);


    try {

      // create Product
      await axios.put(customAPI.defaults.baseURL +'/product/' + id, {
        name: data.name,
        price: data.price,
        description: data.description,
        stock: data.stock,
        category: data.category
      })
      toast.success("berhasil update Produk")
      navigate('/products')

    } catch (error) {
      const errorMessage = error?.response?.data?.message
      toast.error(errorMessage)
      toast.error(error)
    }

  }

  useEffect(() => {
    getProductId()
  }, [])
  return (
    <>
      {
        product ? (<form onSubmit={handleSubmit} encType='multipart/form-data' method='POST' >
          <FormSelect name="category" label="Pilih category" list={categories} defaultValue={product.category} />
          <FormInput name="name" label="Nama Produk" type="text" defaultValue={product.name} />
          <FormInput name="price" label="Harga Produk" type="number" defaultValue={product.price} />
          <FormInput name="stock" label="Stock Produk" type="number" defaultValue={product.stock} />
          <FormTextarea name="description" label="Deskripsi Produk" defaultValue={product.description} />
          <input type='submit' value="Edit" className='btn btn-primary btn-block mt-5 btn-md' />
        </form >) : (
          <Loading />
        )}
    </>
  )
}

export default EditProductView