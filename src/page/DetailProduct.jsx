import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import customAPI from '../api';
import { FaPlus } from 'react-icons/fa6';
import { generateSelectAmount, priceFormat } from '../utils/index'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/cartSlice';
import axios from 'axios';

const DetailProduct = () => {
    let { id } = useParams();
    const [product, setProduct] = useState("")
    const [amount, setAmount] = useState(1)

    //store
    const dispatch = useDispatch()


    const handleAmount = (e) => {
        setAmount(parseInt(e.target.value))
    }

    const productCart = {
        cartId: product._id + product.name,
        productId: product._id,
        image: product.image,
        name: product.name,
        price: product.price,
        stock: product.stock,
        amount,
    }

    const productData = async () => {
        const { data } = await axios.get(customAPI.defaults.baseURL + '/product/' + id)
        setProduct(data.data)
    }


    const handleCart = () => {
        dispatch(addItem({ product: productCart }))
    }


    useEffect(() => {
        productData()
    }, [])
    return (
        <section>
            <div className="card lg:card-side bg-base-300 shadow-xl">
                <figure>
                    <div className="relative">
                        <img
                            className='w-[400px] h-[500] object-cover'
                            src={product.image}
                            alt={product.name} />
                        <>
                            {product.stock < 1 && (
                                <span className="absolute top-0 right-0 bg-error font-bold text-4xl">
                                    Sold Out
                                </span>
                            )}
                        </>
                    </div>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <span className="text-3xl text-accent">{priceFormat(product.price)}</span>
                    <span className="badge badge-primary">{product.category}</span>
                    <span className="mt-3 font-bold">Stock : {product.stock}</span>
                    <p>{product.description}</p>
                    <div className="card-actions justify-end">
                        <div className='p-8 flex flex-col gap-y-4'>
                            {product.stock > 0 && (<label className='form-control'>
                                <label className='label'>
                                    <span className='capitalize label-text'>
                                        Amount
                                    </span>
                                </label>
                                <select name="amount" id="amount" className='select select-bordered' onChange={handleAmount}>
                                    {generateSelectAmount(product.stock)}
                                </select>
                            </label>)}

                            <button className="btn btn-primary" onClick={handleCart}><FaPlus /> Keranjang</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DetailProduct