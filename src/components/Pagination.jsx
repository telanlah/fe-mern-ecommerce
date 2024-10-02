import React from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const Pagination = () => {
    const { pagination } = useLoaderData()
    const { page, totalPage } = pagination
    const navigation = useNavigate()
    const {search, pathname} = useLocation()

    const handlePageChange = (number) => {
        // console.log(number);
        // console.log(search);
        // console.log(pathname);
        
        const searchParams = new URLSearchParams(search)
        searchParams.set("page",number)
        navigation(`${pathname}?${searchParams.toString()}`);
    }

    const pages = Array.from({ length: totalPage }, (_, index) => {
        return index + 1
    })
    // console.log(pages);
    // console.log(pagination);
    
    return (
        <div className="join">
            {pages.map((pageNumber) => {
                // console.log(pageNumber);
                
                return (
                    <button onClick={()=> handlePageChange(pageNumber)} className={`btn border-none join-item ${pageNumber === page ? "btn-active" : ""}`} key={pageNumber}>{pageNumber}</button>
                )
            })}
        </div>
    )
}

export default Pagination