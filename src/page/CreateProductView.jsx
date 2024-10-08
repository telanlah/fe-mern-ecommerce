
import FormInput from '../components/form/FormInput'
import FormSelect from '../components/form/FormSelect'
import FormTextarea from '../components/form/FormTextarea'
import customAPI, { baseURL } from '../api'
import { toast } from 'react-toastify'
import { useNavigate, redirect } from 'react-router-dom'
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

const CreateProductView = () => {
    const categories = ['sepatu', 'baju', 'kemeja', 'celana']
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = event.target
        const dataForm = new FormData(form)
        const data = Object.fromEntries(dataForm)

        const url = '/product/file';


        try {
            // upload file
            console.log("uploading file");

            const responseFileUpload = await axios.post(baseURL + url,
                { image: data.image },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                },
            );
            const imageUrl = responseFileUpload.data.url;
            if (responseFileUpload.status === 200) {
                // create Product
                await axios.post(customAPI.defaults.baseURL + '/product/', {
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    stock: data.stock,
                    category: data.category,
                    image: imageUrl
                })
                toast.success("berhasil input Produk")
                navigate('/products')
            }


        } catch (error) {
            const errorMessage = error?.response?.data?.message
            toast.error(errorMessage)
            toast.error(error)
        }


    }

    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data' method='POST'>
            <label className="form-control">
                <label className="label">
                    <span className="label-text capitalize">
                        Image
                    </span>
                </label>
                <input type='file' name='image' className='file-input file-input file-input-primary w-full max-w-xs' />
            </label>
            <FormSelect name="category" label="Pilih category" list={categories} />
            <FormInput name="name" label="Nama Produk" type="text" />
            <FormInput name="price" label="Harga Produk" type="number" />
            <FormInput name="stock" label="Stock Produk" type="number" />
            <FormTextarea name="description" label="Deskripsi Produk" />
            <input type='submit' value="Tambah" className='btn btn-primary btn-block mt-5 btn-md' />
        </form>
    )
}

export default CreateProductView