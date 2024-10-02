import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'

const Hero = () => {
    const { products } = useLoaderData()
    return (
        <>
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div>
                    <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
                        Selamat Datang di MyShop
                    </h1>

                    <p className='mt-8 mx-w-xl text-lg leading-8'>
                        Dimana kalian bisa mencari Baju, Sepatu, Kemeja dari Aerostreet, BTW ini bukan official dan ini hanya testing website
                    </p>
                    <div className="mt-10">
                        <Link to={'/products'} className="btn btn-primary">Produk Kami</Link>
                    </div>
                </div>
                <div className="hidden lg:carousel carousel-vertical rounded-box h-96">
                    {products.map((item) => (
                        <div className="carousel-item h-full" key={item._id}>
                            <img
                                src={item.image}
                                className="rounded-box" />
                        </div>))}

                </div>
            </div>
        </>
    )
}

export default Hero