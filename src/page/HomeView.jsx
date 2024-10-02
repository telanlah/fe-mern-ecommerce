
import CartProduct from "../components/CartProduct"
import customAPI, { baseURL } from "../api"
import { useLoaderData } from "react-router-dom"
import Hero from "../components/Hero"
import axios from "axios"


export const loader = async ({ request }) => {
  const url = '/product?limit=3'
  const { data } = await axios.get(baseURL + url)

  const products = data.data

  return { products }
}


const HomeView = () => {

  const { products } = useLoaderData()
  console.log(products);


  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">
          Product List
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {products.map(item => (
          <CartProduct item={item} key={item._id} />
        ))}

      </div>
    </>
  )
}

export default HomeView